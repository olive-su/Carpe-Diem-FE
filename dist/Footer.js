"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prop_types_1 = __importDefault(require("prop-types"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Link_1 = __importDefault(require("@mui/material/Link"));
const styled_components_1 = __importDefault(require("styled-components"));
function Copyright() {
    return variant = "body2";
    color = "text.secondary";
    align = "center" >
        { 'Copyright © ':  }
        < Link_1.default;
    color = "inherit";
    href = "https://mui.com/" >
        Your;
    Website
        < /Link>{' '};
    {
        new Date().getFullYear();
    }
    {
        '.';
    }
    /Typography>;
    ;
}
function Footer() {
    const Div = styled_components_1.default.div `
        display: flex;
        background-color: blue;
        justify-content: space-between;
    `;
    return component = "footer";
    sx = {};
    {
        display: 'flex', justifyContent;
        'space-between';
    }
}
 >
    { /* <Grid component="h2" variant="h5" color="inherit" sx={{ justifyContent: 'space-between', overflowX: 'auto' }} noWrap> */}
    < Typography_1.default >
    src;
"imgs/logotitle.png";
width = { 200:  } /  >
    /Typography>
    < Typography_1.default;
color = "#3366cc";
component = "h4";
variant = "h5" >
    KDS / KSK / LJY / JSW / HSH
    < Box_1.default;
sx = {};
{
    display: 'flex', justifyContent;
    'flex-end';
}
 >
    fontSize;
"large";
sx = {};
{
    color: '#797395';
}
/>
    < /Button>
    < Button_1.default >
    fontSize;
"large";
sx = {};
{
    color: 'red';
}
/>
    < /Button>
    < /Box>
    < /Typography>;
{ /* <Typography component="h2" variant="h5" color="inherit" noWrap sx={{ flex: 1 }}>
//                 KSK
//                 </Typography>
//                 <Typography component="h2" variant="h5" color="inherit" noWrap sx={{ flex: 1 }}>
//                 LJY
//                 </Typography>
//                 <Typography component="h2" variant="h5" color="inherit" noWrap sx={{ flex: 1 }}>
//                 JSW
//                 </Typography>
//                 <Typography variant="subtitle1" align="right" component="p" spacing="">
//                 HSH
//             </Typography> */
}
{ /* <Typography variant="subtitle1" align="right" component="p" spacing="">
//         <Button>
//             <GitHubIcon fontSize="large" sx={{ color: '#797395' }} />
//         </Button>
//         <Button>
//             <YouTubeIcon fontSize="large" sx={{ color: 'red' }} />
//         </Button>
//     </Typography> */
}
/Box>;
;
Footer.propTypes = {
    description: prop_types_1.default.string.isRequired,
    title: prop_types_1.default.string.isRequired,
};
exports.default = Footer;
//# sourceMappingURL=Footer.js.map