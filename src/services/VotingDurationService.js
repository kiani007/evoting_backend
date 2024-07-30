import { convertTo24HourFormat } from "../helper/index.js";
import votingPeriodRepository from "../repository/votingPeriodRepository.js";

const VotingDurationService = {
  addDuration: async (body) => {
    const { date, startHour, startMinute, endHour, endMinute } = body;
    try {
      // Extract period (am/pm) from startHour and endHour
      const [startHourNum, startPeriod] = startHour
        .match(/(\d+)([aApP][mM])/)
        .slice(1, 3);
      const [endHourNum, endPeriod] = endHour
        .match(/(\d+)([aApP][mM])/)
        .slice(1, 3);

      // Convert to 24-hour format
      const startHour24 = convertTo24HourFormat(startHourNum, startPeriod);
      const endHour24 = convertTo24HourFormat(endHourNum, endPeriod);

      // Construct the start and end times
      const startTime = new Date(date);
      startTime.setHours(startHour24, startMinute, 0, 0);

      const endTime = new Date(date);
      endTime.setHours(endHour24, endMinute, 0, 0);

      // Save the voting period in the database

      const result = await votingPeriodRepository.setDurationTime(
        startTime,
        endTime
      );

      return {
        status: 200,
        time: result,
        msg: `Voting duration set from ${result.startTime.toISOString()} to ${result.endTime.toISOString()}.`,
      };
    } catch (error) {
      console.error(error.message);
      res.status(400).send({
        message: "An error occurred while setting the voting duration",
      });
    }
  },
  getTme: async () => {
    try {
      console.log("inxxxx");
      const result = await votingPeriodRepository.getDurationTime();

      return {
        status: 200,
        startTime: result.startTime.toISOString(),
        endTime: result.endTime.toISOString(),
      };
    } catch (error) {
      console.error(error.message);
      res.status(400).send({
        message: "An error occurred while getting the voting duration",
      });
    }
  },
};

export default VotingDurationService;
