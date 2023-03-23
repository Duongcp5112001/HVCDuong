const nav = {
    body: [
        {
            name: "予約管理",
            to: "",
            icon: "",
            listPath: [],
            subtitle: true
        },
        {
            name: "予約登録",
            to: "customerSearchResult_2",
            icon: "call",
            listPath: ['customerSearchResult_2', 'reservationRegistMember'],
            subtitle: false
        },
        {
            name: "予約一覧",
            to: "C041A",
            icon: "list",
            listPath: ['C041A'],
            subtitle: false
        },
        {
            name: "在庫管理",
            to: "",
            icon: "",
            listPath: [],
            subtitle: true
        },
        {
            name: "在庫一覧",
            to: "Block2weeks",
            icon: "list",
            listPath: ['Block2weeks'],
            subtitle: false
        },
        {
            name: "顧客管理",
            to: "",
            icon: "",
            listPath: [],
            subtitle: true
        },
        {
            name: "顧客一覧",
            to: "",
            icon: "people",
            listPath: [],
            subtitle: false
        },
        {
            name: "利用券管理",
            to: "",
            icon: "",
            listPath: [],
            subtitle: true
        },
        {
            name: "利用券一覧",
            to: "",
            icon: "people",
            listPath: [],
            subtitle: false
        },
        {
            name: "抽選管理",
            to: "",
            icon: "",
            listPath: [],
            subtitle: true
        },
        {
            name: "抽選登録",
            to: "",
            icon: "supervised_user_circle",
            listPath: [],
            subtitle: false
        },
        {
            name: "抽選管理",
            to: "",
            icon: "tune",
            listPath: [],
            subtitle: false
        },
        {
            name: "法人代行管理",
            to: "",
            icon: "",
            listPath: [],
            subtitle: true
        },
        {
            name: "法人予約代行業者一覧",
            to: "",
            icon: "business",
            listPath: [],
            subtitle: false
        },
    ],
    footer: [
        {
            name: "サイトコントローラ",
            to: "",
            icon: "control_point_duplicate",
            listPath: [],
            subtitle: false
        },
        {
            name: "マスタ管理",
            to: "",
            icon: "settings",
            listPath: [],
            subtitle: false
        },
    ]
};

export default nav;
