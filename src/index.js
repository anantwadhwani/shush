import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthState from './context/AuthState';
import ShushState from './context/ShushState';
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="793090915569-omj84g73cg15r26lpbqokilo3dkh50m7.apps.googleusercontent.com">
      <AuthState>
        <ShushState>
          <App />
        </ShushState>
      </AuthState>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
