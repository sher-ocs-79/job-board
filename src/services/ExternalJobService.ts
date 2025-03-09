import axios from 'axios';

export const fetchExternalJobs = async () => {
  const response = await axios.get('https://mrge-group-gmbh.jobs.personio.de/xml');
  // Parse XML response (you may need an XML parser like `xml2js`)
  const jobs = response.data; // Replace with actual parsing logic
  return jobs.map((job: any) => ({
    title: job.title,
    description: job.description,
    link: job.link,
  }));
};
