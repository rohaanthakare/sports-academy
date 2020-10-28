export enum Role {
    SUPERADMIN = 'SUPERADMIN',
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER'
}

export class GlobalConstants {
    public static COLORS = {
        domain: ['#5BC0BE', '#FFE66D', '#00B4D8', '#E63946', '#F1FAEE', '#81B29A', '#FFBE0B', '#EF476F', '#FAF3DD',
            '#87BBA2', '#4EA8DE', '#FFA69E', '#E4FDE1', '#B4FADC', '#FFFD82', '#70D6FF', '#EE4266', '#C0C0C0',
            '#A1C181', '#FDB833', '#43BCCD']
    };

    public static SINGLE_COLOR = {
        domain: ['#5BC0BE']
    };
    public static MONTHS_MMM = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    public static SUPERADMIN_VIEWS = [{
        label: 'Dashboard',
        icon:'pi pi-fw pi-chart-bar',
        routerLink: './'
    }, {
        label: 'Data Manager',
        icon:'pi-fw fas fa-database',
        items:[{
            label: 'Upload Data',
            icon:'pi pi-fw pi-upload',
            routerLink: 'superadmin/import-data'
        }]
    }, {
        label: 'Mail Tester',
        icon:'pi-fw fas fa-envelope',
        routerLink: 'superadmin/mail-tester'
    }];
}