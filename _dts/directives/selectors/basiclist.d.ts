export declare function BasicListDirective(): {
    scope: {};
    bindToController: {
        service: string;
        fullList: string;
        idsList: string;
        model: string;
        title: string;
        prop: string;
    };
    compile: (element: any, attrs: any) => {
        pre: () => void;
        post: () => void;
    };
    link: (scope: any, element: any, attrs: any) => void;
    controller: (string | (($scope: any) => any))[];
    controllerAs: string;
    template: string;
};
export declare function BasicListController($scope: any): any;
