import axios from 'axios';

export const fetchExternalJobs = async () => {
  const url: string = process.env.EXTERNAL_JOB_BOARD_API || '';
  const response = await axios.get(url);
  console.log(response, url);
  // Parse XML response (you may need an XML parser like `xml2js`)
  const jobs = response.data;
  return jobs.map((job: any) => ({
    title: job.title,
    description: job.description,
    link: job.link,
  }));
};
