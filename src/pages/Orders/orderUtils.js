export const getOrderState = (state) => {
  if (state === 21) return "PENDIENTE";
  if (state === 22) return "EN PROCESO";
  if (state === 23) return "TERMINADA";
};

export const getOrderDiagnosis = (diagnosis) => {
  if (diagnosis === 21) return "PENDIENTE";
  if (diagnosis === 22) return "REPARADO";
  if (diagnosis === 23) return "SIN REPARACION";
};

export const getOrderUbication = (ubication) => {
  if (ubication === 21) return "SIN ENTREGAR";
  if (ubication === 22) return "ENTREGADO";
};

export const getOrderTier = (tier) => {
  if (tier === 0) return "NORMAL";
  if (tier === 1) return "";
  if (tier === 2) return "";
  if (tier === 3) return "ARMADOS";
  if (tier === 4) return "TURNOS/PRIORIDADES";
  if (tier === 5) return "GARANTIA REPARACION";
  if (tier === 6) return "";
  if (tier === 7) return "GARANTIA COMPRA";
  if (tier === 8) return "BOXES";
  if (tier === 9) return "ABONADOS";
  if (tier === 10) return "";
};

export const getOrderTierBackground = (tier) => {
  if (tier === 0) return "";
  if (tier === 1) return "tier1";
  if (tier === 2) return "tier2";
  if (tier === 3) return "tier3";
  if (tier === 4) return "tier4";
  if (tier === 5) return "tier5";
  if (tier === 6) return "tier6";
  if (tier === 7) return "tier7";
  if (tier === 8) return "tier8";
  if (tier === 9) return "tier9";
  if (tier === 10) return "tier10";
};

export const isTurno = (falla) => falla.toLowerCase().includes("turno");

export const getOrdersFilter = (filter) => {};
