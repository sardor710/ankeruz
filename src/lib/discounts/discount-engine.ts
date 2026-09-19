import type { FusionDiscount, FusionProduct } from "@/lib/cms/fusion-cms";

export interface CartLineItem {
  id: string;
  slug: string;
  title: string;
  numericPrice: number;
  quantity: number;
  categoryId?: string;
  category?: string;
}

export interface DiscountValidationResult {
  isValid: boolean;
  reason?: string;
  discount?: FusionDiscount;
}

export interface LineItemDiscountCalculation {
  itemId: string;
  originalLineTotal: number;
  discountAmount: number;
  discountedLineTotal: number;
}

export interface CartDiscountSummary {
  appliedDiscount: FusionDiscount | null;
  originalSubtotal: number;
  totalDiscountAmount: number;
  finalSubtotal: number;
  lineItemDiscounts: LineItemDiscountCalculation[];
  formattedTotalDiscount: string;
  formattedFinalSubtotal: string;
}

export function formatCurrency(amount: number): string {
  const parts = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${parts} so'm`;
}

export function validateDiscount(
  discount: FusionDiscount,
  cartSubtotal: number,
  currentTime: Date = new Date()
): DiscountValidationResult {
  // 1. Status Check
  if (discount.status === "inactive") {
    return { isValid: false, reason: "This promotion code is currently inactive." };
  }

  // 2. Date Constraints
  if (discount.startDate) {
    const start = new Date(discount.startDate);
    if (currentTime < start) {
      return {
        isValid: false,
        reason: `This promotion starts on ${start.toISOString().split("T")[0]}.`,
      };
    }
  }

  if (discount.endDate) {
    const end = new Date(discount.endDate);
    if (currentTime > end) {
      return { isValid: false, reason: "This promotion code has expired." };
    }
  }

  // 3. Usage Limit Cap
  if (typeof discount.maxUses === "number" && discount.usedCount >= discount.maxUses) {
    return {
      isValid: false,
      reason: "This promotion has reached its maximum total usage limit.",
    };
  }

  // 4. Minimum Spend
  if (discount.minSpend && cartSubtotal < discount.minSpend) {
    const diff = discount.minSpend - cartSubtotal;
    return {
      isValid: false,
      reason: `Add ${formatCurrency(diff)} more to your cart to qualify for this discount.`,
    };
  }

  return { isValid: true, discount };
}

export function calculateCartDiscount(
  items: CartLineItem[],
  discount: FusionDiscount | null
): CartDiscountSummary {
  const originalSubtotal = items.reduce(
    (sum, item) => sum + item.numericPrice * item.quantity,
    0
  );

  if (!discount) {
    return {
      appliedDiscount: null,
      originalSubtotal,
      totalDiscountAmount: 0,
      finalSubtotal: originalSubtotal,
      lineItemDiscounts: items.map((i) => ({
        itemId: i.id,
        originalLineTotal: i.numericPrice * i.quantity,
        discountAmount: 0,
        discountedLineTotal: i.numericPrice * i.quantity,
      })),
      formattedTotalDiscount: "0 so'm",
      formattedFinalSubtotal: formatCurrency(originalSubtotal),
    };
  }

  const validation = validateDiscount(discount, originalSubtotal);
  if (!validation.isValid) {
    return {
      appliedDiscount: null,
      originalSubtotal,
      totalDiscountAmount: 0,
      finalSubtotal: originalSubtotal,
      lineItemDiscounts: items.map((i) => ({
        itemId: i.id,
        originalLineTotal: i.numericPrice * i.quantity,
        discountAmount: 0,
        discountedLineTotal: i.numericPrice * i.quantity,
      })),
      formattedTotalDiscount: "0 so'm",
      formattedFinalSubtotal: formatCurrency(originalSubtotal),
    };
  }

  // Determine eligible items
  const eligibleItems = items.filter((item) => {
    if (discount.scope === "storewide") return true;
    if (discount.scope === "category") {
      return discount.targetIds
        ? discount.targetIds.some(
            (t) =>
              t.toLowerCase() === (item.categoryId || "").toLowerCase() ||
              t.toLowerCase() === (item.category || "").toLowerCase()
          )
        : false;
    }
    if (discount.scope === "product") {
      return discount.targetIds
        ? discount.targetIds.some(
            (t) =>
              t.toLowerCase() === item.id.toLowerCase() ||
              t.toLowerCase() === item.slug.toLowerCase()
          )
        : false;
    }
    return false;
  });

  const eligibleSubtotal = eligibleItems.reduce(
    (sum, i) => sum + i.numericPrice * i.quantity,
    0
  );

  let totalDiscountAmount = 0;
  const lineItemDiscounts: LineItemDiscountCalculation[] = [];

  if (discount.type === "percentage") {
    const rate = Math.min(100, Math.max(0, discount.value)) / 100;
    for (const item of items) {
      const isEligible = eligibleItems.includes(item);
      const lineTotal = item.numericPrice * item.quantity;
      const lineDiscount = isEligible ? Math.round(lineTotal * rate) : 0;
      totalDiscountAmount += lineDiscount;
      lineItemDiscounts.push({
        itemId: item.id,
        originalLineTotal: lineTotal,
        discountAmount: lineDiscount,
        discountedLineTotal: lineTotal - lineDiscount,
      });
    }
  } else {
    // Fixed amount discount
    const cappedFixed = Math.min(discount.value, eligibleSubtotal);
    totalDiscountAmount = cappedFixed;

    let distributed = 0;
    items.forEach((item, idx) => {
      const lineTotal = item.numericPrice * item.quantity;
      const isEligible = eligibleItems.includes(item);
      let lineDiscount = 0;

      if (isEligible && eligibleSubtotal > 0) {
        if (idx === items.length - 1) {
          lineDiscount = totalDiscountAmount - distributed;
        } else {
          lineDiscount = Math.round((lineTotal / eligibleSubtotal) * totalDiscountAmount);
          distributed += lineDiscount;
        }
      }

      lineItemDiscounts.push({
        itemId: item.id,
        originalLineTotal: lineTotal,
        discountAmount: lineDiscount,
        discountedLineTotal: Math.max(0, lineTotal - lineDiscount),
      });
    });
  }

  const finalSubtotal = Math.max(0, originalSubtotal - totalDiscountAmount);

  return {
    appliedDiscount: discount,
    originalSubtotal,
    totalDiscountAmount,
    finalSubtotal,
    lineItemDiscounts,
    formattedTotalDiscount: formatCurrency(totalDiscountAmount),
    formattedFinalSubtotal: formatCurrency(finalSubtotal),
  };
}

/**
 * Calculates PDP and Product Card active price based on promotions.
 */
export function getProductEffectiveDiscount(
  product: FusionProduct,
  discounts: FusionDiscount[]
): {
  effectivePrice: number;
  formattedEffectivePrice: string;
  wasPrice?: string;
  discountPill?: string;
  appliedDiscount: FusionDiscount | null;
} {
  const activeDiscounts = discounts.filter((d) => d.status === "active");
  let bestDiscount: FusionDiscount | null = null;
  let maxSavings = 0;

  for (const disc of activeDiscounts) {
    if (disc.minSpend && product.numericPrice < disc.minSpend) continue;

    let isMatch = false;
    if (disc.scope === "storewide") {
      isMatch = true;
    } else if (disc.scope === "category") {
      isMatch = disc.targetIds
        ? disc.targetIds.some(
            (t) =>
              t.toLowerCase() === product.categoryId.toLowerCase() ||
              t.toLowerCase() === product.category.toLowerCase()
          )
        : false;
    } else if (disc.scope === "product") {
      isMatch = disc.targetIds
        ? disc.targetIds.some(
            (t) =>
              t.toLowerCase() === product.id.toLowerCase() ||
              t.toLowerCase() === product.slug.toLowerCase()
          )
        : false;
    }

    if (isMatch) {
      const savings =
        disc.type === "percentage"
          ? Math.round((product.numericPrice * disc.value) / 100)
          : Math.min(product.numericPrice, disc.value);

      if (savings > maxSavings) {
        maxSavings = savings;
        bestDiscount = disc;
      }
    }
  }

  if (bestDiscount && maxSavings > 0) {
    const discountedNum = product.numericPrice - maxSavings;
    const pill =
      bestDiscount.type === "percentage"
        ? `-${bestDiscount.value}%`
        : `Save ${formatCurrency(bestDiscount.value)}`;

    return {
      effectivePrice: discountedNum,
      formattedEffectivePrice: formatCurrency(discountedNum),
      wasPrice: product.price,
      discountPill: pill,
      appliedDiscount: bestDiscount,
    };
  }

  return {
    effectivePrice: product.numericPrice,
    formattedEffectivePrice: product.price,
    wasPrice: product.wasPrice,
    discountPill: product.discountPill,
    appliedDiscount: null,
  };
}
