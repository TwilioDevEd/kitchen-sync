# Release Webinar Kitchen Sync Demo

This demo was presented at the February 8th, 2021 Twilio Release Webinar to showcase [Twilio Sync](https://www.twilio.com/sync). Kitchen Sync is a fictional food delivery service application that uses Twilio Sync for Group Order voting. This is the voting portion of the demo, and should not be used in a production environment.

Developers use Twilio Sync to build two-way, real-time communication between browsers, mobile phones, and the cloud. Sync is a powerful, low-level tool, so you should make sure your use case fits and designs your application to harness its functionality.

> A [Twilio account](http://www.twilio.com/console) is required to run this application.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/TwilioDevEd/kitchen-sync.git

# Go inside the directory
cd kitchen-sync

# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm start)
```

### Set environment files

Rename `.example.env` to `.env`. Follow the instructions below to set your environment variables.

| Variable Name            | Where to get it                                                                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TWILIO_ACCOUNT_SID`       | Find your account Sid in the Project Info pane in the [Console](https://www.twilio.com/console).                                                                                       |                                                                        |                                                               |
| `TWILIO_API_KEY`           | Create an API Key via the [REST API](https://www.twilio.com/docs/iam/keys/api-key-resource) or [Console](https://www.twilio.com/console/runtime/api-keys).          |
| `TWILIO_API_SECRET`        | Create an API Key via the [REST API](https://www.twilio.com/docs/iam/keys/api-key-resource) or [Console](https://www.twilio.com/console/runtime/api-keys).          |
| `TWILIO_SYNC_SERVICE_SID`  | Create a Sync Service Sid via the [REST API](https://www.twilio.com/docs/sync/api/service) or [Console](https://www.twilio.com/console/sync/services).              |


# Running the application

1. Type `npm run dev` in Terminal
2. Open the [webpage](http://localhost:3000)
