# Personal Wealth Dashboard for Alpaca Trading API

This application interfaces with the Alpaca Trading API and was created to enhance my investing experience. I found existing tools too complex and lacking essential features, so I decided to build something more user-friendly and minimalist. The aim is to provide an easy-to-use interface for buying and managing my favorite assets. It’s an ongoing project, and I will keep updating it as I gain more insights on my investing journey

## Stack
- Next.js (Fullstack framework)
- MUI (Material UI)
- Firebase (Authentication, Firestore Database)
- Alpaca (Trading api)
- OpenAI (LLM)


[Demo](https://appreciate.vercel.app)

Responsive on desktop and mobile devices. Tablet screens coming soon.


![Preview](https://firebasestorage.googleapis.com/v0/b/appreciate-4ab8c.appspot.com/o/Content%2FScreenshot%202024-07-25%20at%2019.15.28.png?alt=media&token=c522c3e0-8c9a-4fbe-94c5-7f0cb2c0ef7d)



# Getting Started with Appreciate
```
git clone https://github.com/davidpobi/Appreciate-finance.git
cd Appreciate-finance
npm install
```


## Setting Up API Keys
To interact with the dashboard in your browser, you will need API Keys from [Alpaca](https://alpaca.markets/), [OpenAI](https://platform.openai.com/playground/), and [Firebase](https://console.firebase.google.com/). Follow the steps below to obtain and use these keys.

1. **Obtain the API keys from the respective platforms:**
   - **Alpaca:** Visit [Alpaca Markets](https://alpaca.markets/) and generate your API keys.
   - **OpenAI:** Visit [OpenAI Playground](https://platform.openai.com/playground/) to get your API key.
   - **Firebase:** Visit [Firebase Console](https://console.firebase.google.com/) and set up your project to obtain the necessary API keys and service account credentials.

2. **Create a `.env` file in the root folder of your project.**

3. **Replace 'XXX-XXX' with your respective keys in the `.env` file as shown below:**

```
# OpenAI API Key
OPENAI_API_KEY="XXX-XXX"

# Alpaca API Keys
ALPACA_API_KEY="XXX-XXX"
ALPACA_API_SECRET="XXX-XXX"
ALPACA_API_KEY_LIVE="XXX-XXX"
ALPACA_API_SECRET_LIVE="XXX-XXX"

# Firebase Admin SDK Keys
FIREBASE_PRIVATE_KEY="XXX-XXX"
FIREBASE_CLIENT_EMAIL="XXX-XXX"

# Firebase Public Configuration Keys
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY="XXX-XXX"
NEXT_PUBLIC_FIREBASE_PUBLIC_AUTH_DOMAIN="XXX-XXX"
NEXT_PUBLIC_FIREBASE_PUBLIC_PROJECT_ID="XXX-XXX"
NEXT_PUBLIC_FIREBASE_PUBLIC_STORAGE_BUCKET="XXX-XXX"
NEXT_PUBLIC_FIREBASE_PUBLIC_MESSAGING_SENDER_ID="XXX-XXX"
NEXT_PUBLIC_FIREBASE_PUBLIC_APP_ID="XXX-XXX"
NEXT_PUBLIC_FIREBASE_PUBLIC_MEASUREMENT_ID="XXX-XXX"
```



### `yarn install`

Install app dependencies


### `yarn run dev`

Runs the app in the development mode.\
Open [http://localhost:1992](http://localhost:1992) to view it in the browser.



### `yarn run build`

Builds the app for production to the `.next` folder.\

Your app is ready to be deployed!

