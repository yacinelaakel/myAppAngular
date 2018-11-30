## Content

#### PWA 

> Progressive Web App is an installable website which lives on the user's home screen and works
> offline. It offers a full-screen experience and can re-engage users with web push notifications.

#### Angular Universal

> Server-side rendering, here called Angular Universal - is a technique of rendering application 
> content on the initial request. What customer gets, is fully rendered website and application packed in 
> the js file.

Thanks to Angular Universal you got :
	- Better perceived performance
    - Search Engine Optimization
  	- Site preview

#### Lazy-Loading 

#### AMP

> Accelerated Mobile Pages is an open-source initiative. The project enables the creation of web 
> applications that are fast and high-performing across devices and platforms.

#### Serverless support

> Serverless computing is a cost-effective environment for web applications. You pay only for 
> those resources which you are factually using, instead of running your hosting 24 hours for 7 days a 
> week.

Most popular Serverless environments are : 	
	- AWS Lambda
  	- Google Cloud Functions
  	- Azure Functions
  	- Webtasks

#### Serverless support for existing projects:
```
ng add @ng-toolkit/serverless
```
[Read more](https://github.com/maciejtreder/ng-toolkit/tree/master/schematics/serverless/README.md)

## Installation

### Dev
```
npm install
npm run start
```
- Node dev server file : server.dev.js
- Angular CLI port : localhost:4200
- Node server port : localhost:8081

### Prod
```
npm install
npm run build:prod
npm run server
```
- Node prod server file : server.ts
- Prod ports : localhost:8081
