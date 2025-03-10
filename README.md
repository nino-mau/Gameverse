# GameVerse.local

## 1. Nginx Configuration

### 1. vhost-configuration in sites-available -> gameverse.local

```nginx
server {
   listen 443 ssl;
   server_name gameverse.local;

   ssl_certificate /etc/nginx/ssl/local.crt;
   ssl_certificate_key /etc/nginx/ssl/local.key;

   location / {
      proxy_pass http://localhost:4000;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
   }

}
server {
   listen 80;
   server_name gameverse.local;
   return 301 https://$host$request_uri; # Redirect HTTP to HTTPS
}
```

### 2. first ssl file in /etc/nginx/ssl -> local.crt

      -----BEGIN CERTIFICATE-----
      MIIDtzCCAp+gAwIBAgIUHhazYI95QWHB/UgFJ48/PLymXacwDQYJKoZIhvcNAQEL
      BQAwazELMAkGA1UEBhMCRlIxDjAMBgNVBAgMBWlzZXJlMQ8wDQYDVQQHDAZtZXls
      YW4xITAfBgNVBAoMGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDEYMBYGA1UEAwwP
      Z2FtZXZlcnNlLmxvY2FsMB4XDTI1MDMwODE5MDAwNFoXDTI2MDMwODE5MDAwNFow
      azELMAkGA1UEBhMCRlIxDjAMBgNVBAgMBWlzZXJlMQ8wDQYDVQQHDAZtZXlsYW4x
      ITAfBgNVBAoMGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDEYMBYGA1UEAwwPZ2Ft
      ZXZlcnNlLmxvY2FsMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApM3k
      TUSPYlriL/bt5SdDXENxo72DmSwuq/A3ZZc2H2k5+pMfqYr2hQV2EqQ6CIydaBr0
      Gz3AhlJ5xwR3xTjsFsO1jnesyOD1BbcMMpXBJuVY680mcqAP2MWfLi1qn6SADGlq
      VDS3KJVIJCWjYqFejywvjk6Sg1ZjSpD74g+wxnfpJ6BFDjg4fSJejH3c7DcReGpl
      3ujOOnAXqaPnwN7/E5ptOPMTgaWXRxQibMDU8R7sbXW8vJrbI1vXpzuSp1OEM1b8
      aSxXHAEqgVgLJ0Ej9IQkAp7UGVSKgpeT6psScWKN7/Ajg6RN5AtFTdXvtrlMXduu
      DrLSSjTlWnMMXNdexwIDAQABo1MwUTAdBgNVHQ4EFgQU1Um4CFTMobPL1Nfr2dSN
      eDCdZVkwHwYDVR0jBBgwFoAU1Um4CFTMobPL1Nfr2dSNeDCdZVkwDwYDVR0TAQH/
      BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAZhIETGWrB/Je3Z/I58FEuNaVQbD1
      vV7ycVbbnP9ifDVw3bVQ7ryGac5wAFR2uZkNgbJr+J5mBdou6JHg1O40gpDp1Js0
      x/7SDF/Cvf1nGyER+KWfKDBcRs8nPPtPsrLY8GVSGJdCxv0fH77rtMAVWqtHw9oN
      UTrUBIjBeO7AOY8P62brXouoNfDkfdbhQUToZ9t6VTgf5qFHrcHTcxLEY7XMCoE7
      RLq4gQb6wC8+oNcPPexr3VPxDrkVuCsjcsf+AFRp69H+tb95CqwSz2+WXCCxGif9
      huYCHsmuEwTGcZXK807v8zLfAArV3NH2jCOyYvPIEVaueqcEZfVzZZlv0w==
      -----END CERTIFICATE-----

### 3. second ssl file in /etc/nginx/ssl -> local.key

      -----BEGIN PRIVATE KEY-----
      MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCkzeRNRI9iWuIv
      9u3lJ0NcQ3GjvYOZLC6r8DdllzYfaTn6kx+pivaFBXYSpDoIjJ1oGvQbPcCGUnnH
      BHfFOOwWw7WOd6zI4PUFtwwylcEm5VjrzSZyoA/YxZ8uLWqfpIAMaWpUNLcolUgk
      JaNioV6PLC+OTpKDVmNKkPviD7DGd+knoEUOODh9Il6MfdzsNxF4amXe6M46cBep
      o+fA3v8Tmm048xOBpZdHFCJswNTxHuxtdby8mtsjW9enO5KnU4QzVvxpLFccASqB
      WAsnQSP0hCQCntQZVIqCl5PqmxJxYo3v8CODpE3kC0VN1e+2uUxd264OstJKNOVa
      cwxc117HAgMBAAECggEAGAPgttm8wypXN4IWHIRiLnmtf5zIJnPnwSpaCDXGr0EY
      L8lsnbogPjYThJfl1QUYkukKlUWkXm56TGP8SAMJdC/EryQFS6hsTA7meiCUauSU
      1peoeJ+Wb5Ispf/8P5MrDaP22Jpt7j4CqzHI40B8lQRtUaFlfDoEcgM6kTCUI/dt
      EQQ4oyLLWZtvgIyi5MsclSVkxlOp9PavSjEh0M0Cp9ZEoeSctUaqgYnu6LIaMBNV
      z5JpfcVx36CGOieWNua4r7gjAqXuROgLSL9erQCzwZtm96WQsDTaKTsVWgLvqQHX
      zeXp0AYg+0/Tr+jz2KcEbUTHinf2PCiFeTrrHhnyYQKBgQDkZ7qQB3QtWKhFi0a9
      HB4xW+m00OUiByYKp/oOsoEp27E4edhOEMJRo4hlRSWCbeDLYNW6iUPIvfpzr3DU
      xStnL3wjGI9My0wO36kbXiHQd1dAzObJj1ZTdlXcR3BK4U3c6rkCXIZ9jO4HlVsV
      9K62yMs9Oq/5edt7FCRjSQIF2QKBgQC4txIAGeu0LBGhcvo8PinjKQx2MhV25IPk
      WDyIGlqGAoqsrGn+mE9Oo+jMXSN5e/bT0qnzuGGkn1Mv5FXo+Y9vkQxeCd+MhIrb
      KwVt31WrPpQTik4lugrN25jEvjvWTstGLW6uDF2IPxL5bN54I9xy1Wuq6SXWSnVb
      bjz1gGyFnwKBgDQc+rMsEDTceqBLc9toE/d9Gii4VN9btDFQPDyoO9I6HwhcvJ6r
      MjsATfmVOka1HUoqEPnbocymlANbLypMxmdnrTIww1lpNTRbkbD93Ec9Q3o0hh/N
      BYxLfrGg1x0upN5X69h/FeyFgDXYvQyYZFiuHbkdr9MDG7HMWbURjlWZAoGALGH4
      lkOkKeeI2PUqgT0ijW14jBHerHGd60j0SnOimp6TuYe39C+eprOlpS0f7/nERgNR
      SLld5NNPhqtjpRYJy/HbOeE/cKEMSDsfE9Zc3EeuBr/tpQz9uZbxLxzSfdzy5MrX
      1EQuWSVmpr3s+osLViBHvYpFyCad6jkjto2EBdsCgYB/j4xKxvf5get4sZUL78MU
      ngxci/cgTeYCcfqIAPlNZM7p2UzY7pAg85eHzlVD29WV563GGHW6H+o6cV13mkLH
      rEQoKMYdPJhIN5zgthFKAsFzkxPjWtOyTCXs82QX3Ad+aBADxEm2VfdFQD3onXdv
      zrweoM/o4+6W5IwfEghOaA==
      -----END PRIVATE KEY-----

## 2. Devlopment Env

```ini
# Store environement, either production or devlopment
NODE_ENV='dev'

# Store secret passphare for short term jwt
ACCESS_TOKEN_SECRET='0658627a26e0110b60f6e8707943ef982bd359bf5801165e9e8c42f7c652a1fb'

# Store duration of access token
ACCESS_TOKEN_DURATION='5m'

# Store secret passphrase for longterm jwt
REFRESH_TOKEN_SECRET='bc058456b0247310390a0ff054a92ad5c90221a257532a808e045371f6fdc4cf'

# Store two differents possible duration of refresh token
REFRESH_TOKEN_LONG='15d'
REFRESH_TOKEN_SHORT='1d'

# Store port
PORT=4000

# Store site url
SITE_URL='https://gameverse.local'
```

## 3. File Structure

      📁 GamesMatch
         📁 .vscode
         📁 client
            📁 .vscode
                  ─ extensions.json
                  ─ settings.json
            ─ index.html
            📁 public
                  ─ favicon.ico
            ─ README.md
            📁 src
                  ─ App.vue
                  📁 assets
                     ─ base.css
                     📁 css
                        ─ hover-effects.css
                     📁 fonts
                     📁 img
                     📁 js
                        ─ utils.js
                     ─ main.css
                  📁 components
                     📁 background
                     ─ BtnCustomHover1.vue
                     ─ FormLogin.vue
                     ─ FormRegister.vue
                     📁 icons
                        📁 brands
                     📁 illustrations
                        ─
                     📁 landing-page
                        ─ LandingPageSection1.vue
                        ─ LandingPageSection2.vue
                        ─ LandingPageSection3.vue
                        ─ LandingPageSection4.vue
                        ─ LandingPageSection5.vue
                        ─ LandingPageSection6.vue
                        ─ LandingPageSection7.vue
                     ─ MainFooter.vue
                     ─ MainNavbar.vue
                     📁 unused
                        ─ FeatureSection1.vue
                  ─ main.js
                  📁 router
                     ─ index.js
                  📁 stores
                     ─ authStore.js
                  📁 views
                     ─ LandingPage.vue
                     ─ LoginPage.vue
                     ─ RegisterPage.vue
            ─ vite.config.js
         📁 server
            📁 .vscode
            ─ app.js
            📁 controllers
                  ─ authController.js
                  ─ usersController.js
            📁 db
            📁 middlewares
                  ─ middlewares.js
            ─ package-lock.json
            ─ package.json
            📁 routes
                  ─ users.route.js
            📁 utils
                  ─ utils.js
         ─ README.md

```

```
