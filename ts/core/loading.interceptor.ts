import { URLs } from './settings';

export default function loadingStatus($injector) {
    let numLoadings = 0;
	return ({
		request: function request(config) {
            const $ionicLoading = $injector.get('$ionicLoading');
            
			if (config.url.indexOf(URLs.services) === 0) {
				numLoadings++;
                config.timeout = 2500;
			}
            
            if (numLoadings > 0) {
                $ionicLoading.show();
            }
			return (config);
		},
        
        response: function (response) {
            const $ionicLoading = $injector.get('$ionicLoading'); 
            
            if (response.config.url.indexOf(URLs.services) === 0) {
				numLoadings--;
			}
            if (numLoadings <= 0) {
                numLoadings = 0;
                $ionicLoading.hide();
            }

            return response;
        },
        responseError: function (response) {
            const $ionicLoading = $injector.get('$ionicLoading'); 
            
            if (response.config.url.indexOf(URLs.services) === 0) {
				numLoadings--;
			}
            if (numLoadings <= 0) {
                numLoadings = 0;
                $ionicLoading.hide();
            }

            return response;
        }
	});
}