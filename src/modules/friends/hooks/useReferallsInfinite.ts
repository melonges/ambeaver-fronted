import { useReferralControllerGetReferralsInfinite } from "@/modules/api/referral/referral";

const PER_PAGE = 10;
const FIRST_PAGE = 0;

export const useReferallsInfinite = () =>
  useReferralControllerGetReferralsInfinite(
    {
      page: FIRST_PAGE,
      perPage: PER_PAGE,
    },
    {
      query: {
        getNextPageParam: (lastPage) => {
          const { page, totalPages } = lastPage.data.meta;

          if (page < totalPages) {
            return page + 1;
          }

          return page;
        },
        getPreviousPageParam: (firstPage) => {
          const { page } = firstPage.data.meta;

          if (page > FIRST_PAGE) {
            return page - 1;
          }

          return page;
        },
      },
    }
  );
