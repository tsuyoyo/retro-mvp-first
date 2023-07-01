import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

// https://mui.com/material-ui/getting-started/installation/#roboto-font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { PriceData } from '@/utils/models/priceData';
import { fetchPriceDataOnYahooAuction } from '@/utils/yahoo/fetchValue';
import { PriceInfoItem } from '@/components/PriceInfoItem';
import { titles } from 'consts/titles';
import { Grid } from '@mui/material';

type TitleData = {
  title: string;
  priceData: PriceData;
};

export const getServerSideProps: GetServerSideProps<{
  data: TitleData[];
}> = async () => {
  const fetchTasks: Promise<PriceData>[] = [];
  const info: TitleData[] = [];

  for (let i = 0; i < titles.length; i++) {
    fetchTasks.push(fetchPriceDataOnYahooAuction(titles[i]));
  }
  const results = await Promise.all(fetchTasks);
  results.forEach((value, i) => {
    info.push({ title: titles[i], priceData: value });
  });

  return { props: { data: info } };
};

export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <div>
        <Grid container spacing={2}>
          {data.map((d) => {
            return (
              <Grid item xs={4} key={d.title}>
                <PriceInfoItem title={d.title} priceData={d.priceData} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </main>
  );
}
