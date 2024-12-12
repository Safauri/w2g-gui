# Electron W2G Room Creator

This project is an Electron application that allows users to create Watch2Gether (W2G) rooms directly from the desktop. By providing a video URL, the app uses the W2G API to create a new room and returns the room's URL.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your W2G API key:

   ```env
   w2g_api_key=your_api_key_here
   ```

4. Start the application:

   ```bash
   npm start
   ```

## Usage

1. Launch the app by running the command `npm start`.
2. Input the desired video URL when prompted.
3. The app will generate a new Watch2Gether room and return the room URL.


## Notes

- The W2G API key can be managed at: [W2G User Account Settings](https://w2g.tv/en/account/edit_user/).
- The app uses Axios to make a POST request to the Watch2Gether API to create a room


![Screenshot 2024-12-12 182420](https://github.com/user-attachments/assets/df9e42b4-f02e-43df-9f8e-1733c63a5a64)
