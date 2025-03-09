import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const EXTERNAL_JOB_BOARD_API = process.env.EXTERNAL_JOB_BOARD_API;

if (!EXTERNAL_JOB_BOARD_API) {
  throw new Error('EXTERNAL_JOB_BOARD_API environment variable is not set.');
}

export const fetchExternalJobs = async () => {
  try {
    const response = await axios.get(EXTERNAL_JOB_BOARD_API, {
      headers: {
        'Accept': 'application/xml',
      },
    });

    const parsedData = await parseStringPromise(response.data, {
      explicitArray: false,
    });
    
    const positions = parsedData['workzag-jobs'].position;

    return positions.map((position: any) => {
      // Extract and combine all jobDescriptions into a single description
      const jobDescriptions = position.jobDescriptions.jobDescription;
      const combinedDescription = jobDescriptions
        .map((desc: any) => desc.name + '\n' + desc.value.trim())
        .join('\n\n');

      return {
        title: position.name,
        description: combinedDescription,
        link: `https://mrge-group-gmbh.jobs.personio.de/job/${position.id}`,
      };
    });
  } catch (error) {
    console.error('Error fetching external jobs:', error);
    throw new Error('Unable to fetch external job listings.');
  }
};