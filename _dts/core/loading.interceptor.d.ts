export default function loadingStatus($injector: any): {
    request: (config: any) => any;
    response: (response: any) => any;
    responseError: (response: any) => any;
};
