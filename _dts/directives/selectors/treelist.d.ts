export declare function TreeListDirective(): {
    scope: {};
    bindToController: {
        service: string;
        fullList: string;
        idsList: string;
        model: string;
        title: string;
        prop: string;
        childrenProp: string;
    };
    compile: (element: any, attrs: any) => {
        pre: () => void;
        post: () => void;
    };
    controller: (string | (($scope: any, $elem: any) => any))[];
    controllerAs: string;
    template: string;
};
export declare function TreeListController($scope: any, $elem: any): any;
