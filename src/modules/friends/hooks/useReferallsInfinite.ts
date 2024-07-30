import { useReferralControllerGetReferralsInfinite } from "@/modules/api/referral/referral";

const PER_PAGE = 10;

export const useReferallsInfinite = () =>
  useReferralControllerGetReferralsInfinite(
    {
      page: 1,
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

          if (page > 1) {
            return page - 1;
          }

          return page;
        },
      },
    }
  );
