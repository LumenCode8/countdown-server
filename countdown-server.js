#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

function getCountdown() {
  const targetDate = new Date('2026-06-19T00:00:00+10:00');
  const now = new Date();
  const timeDiff = targetDate - now;
  
  if (timeDiff <= 0) {
    return {
      event: { eventName: 'Event Countdown to June 19 Midnight', eventDate: '2026-06-19T00:00:00+10:00', timezone: 'AEST' },
      timeRemaining: { days: 0, hours: 0, minutes: 0, seconds: 0 },
      formattedDisplay: { daysDisplay: '0 Days', hoursDisplay: '0 Hours', minutesDisplay: '0 Minutes', secondsDisplay: '0 Seconds', fullCountdown: '0d 0h 0m 0s', shortCountdown: 'Event started!' },
      totalTimeUnits: { totalDays: 0, totalHours: 0, totalMinutes: 0, totalSeconds: 0 },
      percentageRemaining: { percentOfDay: 0 },
      metadata: { lastUpdated: new Date().toISOString(), updateFrequency: '1 second', status: 'complete' }
    };
  }
  
  const totalSeconds = Math.floor(timeDiff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return {
    event: { eventName: 'Event Countdown to June 19 Midnight', eventDate: '2026-06-19T00:00:00+10:00', timezone: 'AEST' },
    timeRemaining: { days, hours, minutes, seconds },
    formattedDisplay: { daysDisplay: `${days} Days`, hoursDisplay: `${hours} Hours`, minutesDisplay: `${minutes} Minutes`, secondsDisplay: `${seconds} Seconds`, fullCountdown: `${days}d ${hours}h ${minutes}m ${seconds}s`, shortCountdown: `${days} days left` },
    totalTimeUnits: { totalDays: days, totalHours: Math.floor(totalSeconds / 3600), totalMinutes: Math.floor(totalSeconds / 60), totalSeconds },
    percentageRemaining: { percentOfDay: 42 },
    metadata: { lastUpdated: new Date().toISOString(), updateFrequency: '1 second', status: 'active' }
  };
}

app.get('/countdown', (req, res) => {
  res.json(getCountdown());
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Countdown server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/countdown`);
});
