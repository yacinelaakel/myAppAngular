import { AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login'; 

export function getAuthServiceConfigs() {
  	let config = new AuthServiceConfig([
    	{
      		id: FacebookLoginProvider.PROVIDER_ID,
      		provider: new FacebookLoginProvider("279439069423205")
    	}
    	// {
    	// 	GOOGLE, Twitter...
    	// }
  	]);
   	return config;
}