import { activeSite } from "@/lib/sites";

export const FOUNDATION_DATE = new Date(`${activeSite.contact.foundingDate}T00:00:00+01:00`);
export const FOUNDATION_YEAR = FOUNDATION_DATE.getFullYear();
export const CURRENT_YEAR = new Date().getFullYear();

export function getYearsSinceFoundation() {
  const today = new Date();
  const years = today.getFullYear() - FOUNDATION_DATE.getFullYear();
  const anniversaryThisYear = new Date(
    today.getFullYear(),
    FOUNDATION_DATE.getMonth(),
    FOUNDATION_DATE.getDate()
  );

  return today < anniversaryThisYear ? years - 1 : years;
}

export function YearsBannerText({ years }: { years: number }) {
  return <>Jsme tu pro vás již {years} let <span aria-hidden="true">🎈</span></>;
}
