const allSkills = ["softwaredeveloper", "webd eveloper", "mobile applications", "front-end", "frontenddeveloper", "back-end", "full-stackdeveloper", "full stack developer", "fullstackengineer", "database developer", "devopsengineer", "software engineer", "qaengineer", "testautomationengineer", "cloudengineer",
    "data engineer", "machinelearningengineer", "aiengineer", "game developer", "embeddedsystemsengineer", "securityengineer", "uidesigner", "uxdesigner", "agile developer",
    "product manager", "projectmanager", "technicalprojectmanager", "scrummaster", "productowner", "businessanalyst", "requirementsanalyst", "productmarketingmanager",
    "datascientist", "dataanalyst", "businessintelligenceanalyst", "dataengineer", "dataarchitect", "bigdataengineer", "machinelearningengineer", "aispecialist",
    "networkengineer", "systemadministrator", "cloudarchitect", "securityanalyst", "itsupportspecialist", "itconsultant", "itmanager",
    "graphic designer", "ux/uidesigner", "motion designer", "game designer", "3dartist", "videoeditor", "illustrator", "hardwareengineer", "embeddedsystemsengineer", "firmwareengineer", "vlsiengineer",
    "ethical hacker", "cybersecurityanalyst", "security consultant", "html", "css", "javascript", "informationsecurityofficer", "penetrationtester", "securityoperationscenteranalyst",
    "machinelearningengineer", "deeplearningengineer", "deeplearning", "airesearcher", "computervisionengineer", "naturallanguageprocessing", "reinforcementlearningengineer",
    "testautomationengineer", "performancetestingengineer", "manualtester", "sdet",
    "business analyst", "dataanalyst", "businessintelligenceanalyst", "systemsanalyst", "quantitativeanalyst",
    "databaseadministrator", "databasedeveloper", "datawarehouseengineer", "bigdataengineer", "hadoopdeveloper",
    "devops", "buildandreleaseengineer", "continuousintegration", "continuousdelivery",
    "iotengineer", "roboticsengineer", "automationengineer", "controlsystemsengineer", "css",
    "cloudengineer", "cloud architect", "awssolutionsarchitect", "aws", "azuresolutionsarchitect", "googlecloudarchitect",
    "python", "java", "javascript", "c#", "php", "swift", "kotlin", "typescript", "ruby", "go", "rust", "scala", "haskell", "sql", "html", "css",
    "react", "angular", "vue.js", "node.js", "django", "flask", "spring", ".net", "asp.net", "tensorflow", "pytorch", "keras", "opencv", "spark", "hadoop",
    "docker", "kubernetes", "jenkins", "git", "mysql", "postgresql", "mongodb", "firebase", "elasticsearch", "graphql", "restfulapi", "oauth", "oauth2",
    "json", "xml", "oauth", "oauth2", "soap", "ci/cd", "cd", "microservices", "serverless", "blockchain", "ar/vr", "rpa", "agile", "scrum", "waterfall", "kanban", "sdlc",
    "tdd", "testdrivendevelopment", "bdd", "behaviordrivendevelopment", "uml", "unifiedmodelinglanguage", "ooad", "object-orientedanalysisanddesign", "solidprinciples",
    "design patterns", "graphql", "react", "native", "redux", "express.js", "flask",
    "djangorestframework", "asp.netcore", "springboot", "bootstrap", "material-ui", "sass", "less", "web sockets", "progressiv webapps", "single-pageapplication",
    "server-siderendering", "client-siderendering", "cross-originresourcesharing", "swiftui", "androidjetpack", "xamarin",
    "phone gap", "cordova", "flutter", "firebasecloudmessaging", "pushnotifications", "in-apppurchases", "mobileanalytics",
    "amazonwebservices", "aws", "microsoftazure", "googlecloudplatform", "serverlessarchitecture", "awslambda", "azurefunctions", "googlecloudfunctions",
    "infrastructureascode", "iac", "terraform", "cloud formation", "ansible", "puppet", "chef", "sitereliabilityengineering", "cloudsecurity",
    "apache hadoop", "apachespark", "apachekafka", "elastic search", "kibana", "logstash", "java", "html5", "css3",
    "data warehousing", "etl", "datavisualization", "tableau", "powerbi", "datamining", "sentiment analysis", "timeseriesanalysis",
    "microsoftsqlserver", "oracledatabase", "mariadb", "sqlite", "nosqldatabases", "databasereplication", "databasesharding", "datamigration",
    "databaseindexing", "aicd", "machinelearning", "artificialintelligence", "naturallanguageunderstanding", "transfer learning",
    "imagerecognition", "speech recognition", "gans", "autoencoders", "recommender systems", "timeseriesforecasting", "security", "penetrationtesting",
    "vulnerabilityassessment", "siem", "waf", "ddosmitigation", "incident response", "threathunting", "cryptography", "pki", "publickeyinfrastructure", "securecodingpractices", "mqtt",
    "coap ", "zigbee", "lorawan", "bluetooth lowenergy", "industrialiot", "homeautomation", "smartcities", "edgecomputing", "armcortex-m",
    "avrmicrocontrollers", "raspberrypi", "arduino", "fpga", "real-rimeoperatingsystems", "unrealengine", "unityengine", "cocos2d-x", "mephysics",
    "game networking", "game ai", "game design patterns", "webdevelopment", "jsmongodb", "express", "tailwindcss",
    "tcp", "ip protocols", "udp", "http", "https", "dns", "nat", "vpn", "loadbalancing", "sd-wan", "network security", "pandas", "numpy", "scipy", "scikit-learn",
    "rprogramming", "r", "hypothesis testing", "a/btesting", "timeseriesanalysis",
    "js",
    "javascript",
    "react",
    "node",
    "mongo",
    "mern",
    "os",
    "operating system",
    "computer hardware",
    "express",
    "dbms",
    "sql",
    "rdbms",
    "cloud",
    "aws",
    "azure",
    "web",
    "devops",
    "dev",
    "android development",
    "android",
    "scaler",
    "html",
    "css",
    "ruby",
    "cpp",
    "java",
    "c#",
    "angular",
    "vue",
    "swift",
    "php",
    "oops",
    "networking",
    "routing",
    "nlp",
    "data science",
    "neural networks",
    "data mining",
    "feature extraction",
    "feature engineering",
    "git",
    "ios",
    "frameworks",
    "testing",
    "data mining",
    "predictive analysis",
    "time series analysis",
    "cryptography",
    "cloud management",
    "logging tools",
    "logging",
    "robotics",
    "automation",
    "internet of things",
    "embedded systems",
    "data analysis",
    "machine learning",
    "servers",
    "server less computing",
    "network security",
    "big data analysis",
    "data base",
    "databases",
    "pytorch",
    "tensorflow",
    "testing tools",
    "testing",
    "git",
    "cyber security",
    "decentralization",
    "blockchain",
    "block chain",
    "wireless networking",
    "spark",
    "hive",
    "hadoop",
    "django",
    "openvpn",
    "gitlab",
    "puppet",
    "nagios",
    "urscript",
    "typescript",
    "analytical mind",
    "organizational skills",
    "communication skills",
    "presentation skills",
    "teammwork skills",
    "statistics",
    "web servers",
    "ui/ux",
    "mobile developer",
    "browser testing",
    "debugging",
    "seo",
    "adobe",
    "content management",
    "multitasking",
    "api",
    "creativity",
    "3d animations",
    "multiplayer",
    "artificial intelligence",
    "game development",
    "spring boot",
    "relational database",
    "h2",
    "hibernate",
    "transaction managemtn",
    "encryption",
    "decryption",
    "wicket",
    "test-driven development",
    "java development",
    "design patterns",
    "memory management",
    "problem solving",
    "classloading",
    "python developer",
    "js developer",
    "cpp developer",
    "c++ developer",
    "team spirit",
    "team player",
    "pyramid",
    "objective-c",
    "cocoa touch",
    "big data",
    "core animations",
    "core graphics",
    "graphic designer",
    "third party libraries",
    "libraries",
    "architectures",
    "emerging technologies",
    "wireframes", "storyboards", "user flows", "process flows", "site maps",
    "Photoshop", "illustrator, omnigraffle", "other visual design",
    "wire-framing tools",
    "UI trends", "human-computer interaction", "documentation",
    "encoding techniques",
    "defect tracking",
    "writing skills",
    "reading skills",
    "interfaces",
    "business administration",
    "graphic designing",
    "dreamweaver",
    "Indesign",
    "relic",
    "leadership skills",
    "aptitude",
    "leader",
    "windows",
    "operating systems",
    "operating system",
    "self motivated",
    "quick learner",
    "fast learner",
    "rails",
    "automated testing",
    "command line"

];
export default allSkills;