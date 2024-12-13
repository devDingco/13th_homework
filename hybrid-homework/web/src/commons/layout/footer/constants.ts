import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

// prettier-ignore
export const FOOTER_OPTIONS = (params: Params) => ({
  "/solplace-logs": { isButton: false, isNav: true, isFixed: true },
  "/solplace-logs/new": { isButton: true, isNav: false },
  // "/solplace-logs/new/map": {},
  [`/solplace-logs/${params.solplaceLogId}`]: { isButton: false, isNav: false },
  [`/solplace-logs/${params.solplaceLogId}/edit`]: { isButton: true, isNav: false },
  // [`/solplace-logs/${params.solplaceLogId}/edit/map`]: {},
  "/mypages": { isButton: false, isNav: true, isFixed: true },
  "/signup": { isButton: true, isNav: false, isFixed: false }
})
