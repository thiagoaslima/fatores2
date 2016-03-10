export default function interceptHttp(Session) {
    return ({
        request: function request(config) {
            if (config.params && config.params.identify) {
                let params = config.params;
                let token = Session.getToken();
                if (!token) {
                    config.timeout = 1;
                }
                else {
                    params.token = token;
                }
                delete (params.identify);
            }
            return (config);
        }
    });
}
