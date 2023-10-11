import { useState, useEffect } from "react";
import styles from "./del-detail.module.css";
import MyNavbar from "@/components/layout/default-layout/navbar-main/index";
import Footer from "@/components/layout/default-layout/footer";
import productDetail from "../product/[pid]";
import style from "@/pages/product/list.module.css";
// 想引入,but..........................
// import selectAddress from "@/components/cart/select-address"

export default function DelDetail() {
  // 訂購人資訊 (初始化)
  const [purchaser, setPurchaser] = useState({
    purchaserName: "",
    purchaserPhone: "",
    purchaserEmail: "",
  });

  useEffect(() => {
    fetch("http://localhost:3002/cart/del-detail")
      .then((r) => r.json())
      .then((obj) => {
        setPurchaser(obj);
        console.log(obj);
      });
  }, []);

  // 錯誤用初始狀態
  const originErrors = {
    purchaserName: "",
    purchaserPhone: "",
    purchaserEmail: "",
  };
  const [errors, setErrors] = useState(originErrors);

  // 認証通過信號用
  const [isAuth, setIsAuth] = useState(false);

  // 所有欄位共用的事件處理函示
  const handleFieldChange = (e) => {
    const newPurchaser = { ...purchaser, [e.target.name]: e.target.value };

    setPurchaser(newPurchaser);
  };

  const handleSubmit = (e) => {
    //阻擋表單預設的送出行為
    e.preventDefault();

    // 信號值
    let hasError = false;
    const newErrors = { ...originErrors };

    // 訂購人名字沒填
    if (!purchaser.purchaserName) {
      newErrors.purchaserName = "*請填寫訂購者姓名";
      // hasError, 設定的目的？
      hasError = true;
    }

    // 驗證電話號碼
    if (!purchaser.purchaserPhone) {
      newErrors.purchaserPhone = "*請填寫電話號碼";
      hasError = true;
    }

    if (!/09\d{8}/.test(purchaser.purchaserPhone)) {
      newErrors.purchaserPhone =
        "*「手機號碼」格式有誤!請輸入09開頭10碼數字不含其他符號!";
      hasError = true;
    }

    if (!purchaser.purchaserEmail) {
      newErrors.purchaserEmail = "*請填寫電子信箱";
      hasError = true;
    }

    const mailCheck =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (!mailCheck.test(purchaser.purchaserEmail)) {
      newErrors.purchaserEmail = "*電子信箱格式驗證錯誤";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // 認證通過
    setIsAuth(true);
  };

  // --------------------------下拉式地址選單-----------------------------------------------

  // 地址整理(縣市)
  const cityOptions = [
    "基隆市",
    "新北市",
    "宜蘭縣",
    "新竹市",
    "新竹縣",
    "桃園市",
    "苗栗縣",
    "臺中市",
    "彰化縣",
    "南投縣",
    "嘉義市",
    "嘉義縣",
    "雲林縣",
    "臺南市",
    "高雄市",
    "屏東縣",
    "臺東縣",
    "花蓮縣",
    "金門縣",
    "連江縣",
    "澎湖縣",
  ];

  const [city, setCity] = useState("");
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  // 地址整理(鄉鎮市)
  const townshipOptions = [
    [
      "200仁愛區",
      "201信義區",
      "202中正區",
      "203中山區",
      "204安樂區",
      "205暖暖區",
      "206七堵區",
    ],
    [
      "220板橋區",
      "237三峽區",
      "242新莊區",
      "234永和區",
      "235中和區",
      "236土城區",
      "238樹林區",
      "239鶯歌區",
      "241三重區",
      "247蘆洲區",
      "248五股區",
      "243泰山區",
      "244林口區",
      "249八里區",
      "251淡水區",
      "252三芝區",
      "253石門區",
      "208金山區",
      "207萬里區",
      "221汐止區",
      "224瑞芳區",
      "228貢寮區",
      "226平溪區",
      "227雙溪區",
      "231新店區",
      "222深坑區",
      "223石碇區",
      "232坪林區",
      "233烏來區",
    ],
    [
      "261頭城鎮",
      "262礁溪鄉",
      "263壯圍鄉",
      "264員山鄉",
      "265羅東鎮",
      "266三星鄉",
      "267大同鄉",
      "268五結鄉",
      "269冬山鄉",
      "270蘇澳鎮",
      "272南澳鄉",
    ],
    ["300東區", "300北區", "300香山區"],
    [
      "302竹北市",
      "310竹東鎮",
      "305新埔鎮",
      "306關西鎮",
      "303湖口鄉",
      "304新豐鄉",
      "307芎林鄉",
      "308橫山鄉",
      "314北埔鄉",
      "308寶山鄉",
      "315峨眉鄉",
      "313尖石鄉",
      "311五峰鄉",
    ],
    [
      "320中壢區",
      "324平鎮區",
      "325龍潭區",
      "326楊梅區",
      "327新屋區",
      "328觀音區",
      "330桃園區",
      "333龜山區",
      "334八德區",
      "335大溪區",
      "336復興區",
      "337大園區",
      "338蘆竹區",
    ],
    [
      "360苗栗市",
      "351頭份市",
      "350竹南鎮",
      "356後龍鎮",
      "357通霄鎮",
      "358苑裡鎮",
      "369卓蘭鎮",
      "361造橋鄉",
      "368西湖鄉",
      "362頭屋鄉",
      "363公館鄉",
      "366銅鑼鄉",
      "367三義鄉",
      "364大湖鄉",
      "354獅潭鄉",
      "365泰安鄉",
    ],
    [
      "400中區",
      "401東區",
      "402南區",
      "403西區",
      "404北區",
      "406北屯區",
      "407西屯區",
      "408南屯區",
      "411太平區",
      "412大里區",
      "413霧峰區",
      "414烏日區",
      "420豐原區",
      "421后里區",
      "422石岡區",
      "423東勢區",
      "424和平區",
      "426新社區",
      "427潭子區",
      "428大雅區",
      "429神岡區",
      "432大肚區",
      "433沙鹿區",
      "434龍井區",
      "435梧棲區",
      "436清水區",
      "437大甲區",
      "438外埔區",
      "439大安區",
    ],
    [
      "500彰化市",
      "510員林市",
      "508和美鎮",
      "505鹿港鎮",
      "514溪湖鎮",
      "526二林鎮",
      "520田中鎮",
      "521北斗鎮",
      "512永靖鄉",
      "513埔心鄉",
      "511社頭鄉",
      "516永康鄉",
      "516埔鹽鄉",
      "515大村鄉",
      "528芳苑鄉",
      "525竹塘鄉",
      "525竹塘鄉",
      "524溪州鄉",
      "504秀水鄉",
      "527大城鄉",
      "506福興鄉",
      "507線西鄉",
      "503花壇鄉",
      "502芬園鄉",
      "509伸港鄉",
      "511社頭鄉",
      "522田尾鄉",
      "520田中鄉",
      "523埤頭鄉",
      "513埔心鄉",
      "516埔鹽鄉",
      "515大村鄉",
      "528芳苑鄉",
      "530二水鄉",
    ],
    [
      "540南投市",
      "545埔里鎮",
      "542草屯鎮",
      "557竹山鎮",
      "552集集鎮",
      "551名間鄉",
      "558鹿谷鄉",
      "541中寮鄉",
      "555魚池鄉",
      "544國姓鄉",
      "553水里鄉",
      "556義鄉",
      "546仁愛鄉",
    ],
    ["600東區", "600西區"],
    [
      "612太保市",
      "613朴子市",
      "625布袋鎮",
      "622大林鎮",
      "621民雄鄉",
      "623溪口鄉",
      "616新港鄉",
      "615六腳鄉",
      "614東石鄉",
      "624義竹鄉",
      "611鹿草鄉",
      "608水上鄉",
      "606中埔鄉",
      "604竹崎鄉",
      "603梅山鄉",
      "602番路鄉",
      "607大埔鄉",
      "605阿里山鄉",
    ],
    [
      "640斗六市",
      "630斗南鎮",
      "632虎尾鎮",
      "648西螺鎮",
      "633土庫鎮",
      "651北港鎮",
      "647莿桐鄉",
      "643林內鄉",
      "646古坑鄉",
      "631大埤鄉",
      "637崙背鄉",
      "649二崙鄉",
      "638麥寮鄉",
      "635東勢鄉",
      "634褒忠鄉",
      "636台西鄉",
      "655元長鄉",
      "654四湖鄉",
      "653口湖鄉",
      "652水林鄉",
    ],
    [
      "700中西區",
      "701東區",
      ,
      "702南區",
      ,
      "704北區",
      ,
      "708安平區",
      "709安南區",
      "710永康區",
      "711歸仁區",
      "712新化區",
      "713左鎮區",
      "714玉井區",
      "715楠西區",
      "716南化區",
      "717仁德區",
      "718關廟區",
      "719龍崎區",
      "720官田區",
      "721麻豆區",
      "722佳里區",
      "723西港區",
      "724七股區",
      "725將軍區",
      "726學甲區",
      "727北門區",
      "730新營區",
      "731後壁區",
      "732白河區",
      "733東山區",
      "734六甲區",
      "735下營區",
      "736柳營區",
      "737鹽水區",
      "741善化區",
      "742大內區",
      "743山上區",
      "744新市區",
      "745安定區",
    ],
    [
      "800新興區",
      "801前金區",
      "802苓雅區",
      "803鹽埕區",
      "804鼓山區",
      "805旗津區",
      "806前鎮區",
      "807三民區",
      "811楠梓區",
      "812小港區",
      "813左營區",
      "814仁武區",
      "815大社區",
      "820岡山區",
      "821路竹區",
      "822阿蓮區",
      "823田寮區",
      "824燕巢區",
      "825橋頭區",
      "826梓官區",
      "827彌陀區",
      "828永安區",
      "829湖內區",
      "830鳳山區",
      "831大寮區",
      "832林園區",
      "833鳥松區",
      "840大樹區",
      "842旗山區",
      "843美濃區",
      "844六龜區",
      "845內門區",
      "846杉林區",
      "847甲仙區",
      "848桃源區",
      "849那瑪夏區",
      "851茂林區",
      "852茄萣區",
    ],
    [
      "900屏東市",
      "901三地門鄉",
      "902霧台鄉",
      "903瑪家鄉",
      "904九如鄉",
      "905里港鄉",
      "906高樹鄉",
      "907鹽埔鄉",
      "908長治鄉",
      "909麟洛鄉",
      "911竹田鄉",
      "912內埔鄉",
      "913萬丹鄉",
      "920潮州鎮",
      "921泰武鄉",
      "922來義鄉",
      "923萬巒鄉",
      "924崁頂鄉",
      "925新埤鄉",
      "926南州鄉",
      "927林邊鄉",
      "928東港鎮",
      "929琉球鄉",
      "931佳冬鄉",
      "932新園鄉",
      "940枋寮鄉",
      "941枋山鄉",
      "942春日鄉",
      "943獅子鄉",
      "944車城鄉",
      "945牡丹鄉",
      "946恆春鎮",
      "947滿州鄉",
    ],
    [
      "950台東市",
      "951綠島鄉",
      "952蘭嶼鄉",
      "953延平鄉",
      "954卑南鄉",
      "955鹿野鄉",
      "956關山鎮",
      "957海端鄉",
      "958池上鄉",
      "959東河鄉",
      "961成功鎮",
      "962長濱鄉",
      "963太麻里鄉",
      "964金峰鄉",
      "965大武鄉",
      "966達仁鄉",
      "951綠島鄉",
      "952蘭嶼鄉",
    ],
    [
      "970花蓮市",
      "971新城鄉",
      "972秀林鄉",
      "973吉安鄉",
      "974壽豐鄉",
      "975鳳林鎮",
      "976光復鄉",
      "977豐濱鄉",
      "978瑞穗鄉",
      "979萬榮鄉",
      "981玉里鎮",
      "982卓溪鄉",
      "983富里鄉",
    ],
    [
      "893金城鎮",
      "891金沙鎮",
      "892金湖鎮",
      "890金寧鄉",
      "894烈嶼鄉",
      "896烏坵鄉",
    ],
    ["209南竿鄉", "210北竿鄉", "211莒光鄉", "212東引鄉"],
    [
      "880馬公市",
      "881西嶼鄉",
      "882望安鄉",
      "883七美鄉",
      "884白沙鄉",
      "885湖西鄉",
    ],
  ];

  // 宣告狀態
  const [township, setTownship] = useState("");

  return (
    <>
      <MyNavbar />
      {/* 商城分類bar */}
      <div
        className={style.topBox + " container d-flex justify-content-around"}
      >
        <button class="btn" type="button">
          全部商品
        </button>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            飲品/沖泡類
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                茶葉/水果茶
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                咖啡
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                果汁/蔬果汁
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                醋/水果醋
              </a>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            烘焙食品/甜點
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                蛋糕/派
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                手工餅乾
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                麵包/吐司
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                奶酪/布丁/果凍
              </a>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            休閒零食
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                零食
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                糖果/巧克力
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                果醬/抹醬
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                水果乾
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                堅果/穀物
              </a>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            烹料料理
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                熟食/冷藏、冷凍食品
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                米/麵條
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                調理包/料理包
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                調味料/醬料
              </a>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            其他
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                其他
              </a>
            </li>
          </ul>
        </div>
      </div>
    <>
      <MyNavbar />
      {/* 商城分類bar */}
      <div
        className={style.topBox + " container d-flex justify-content-around"}
      >
        <button class="btn" type="button">
          全部商品
        </button>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            飲品/沖泡類
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                茶葉/水果茶
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                咖啡
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                果汁/蔬果汁
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                醋/水果醋
              </a>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            烘焙食品/甜點
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                蛋糕/派
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                手工餅乾
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                麵包/吐司
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                奶酪/布丁/果凍
              </a>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            休閒零食
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                零食
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                糖果/巧克力
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                果醬/抹醬
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                水果乾
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                堅果/穀物
              </a>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            烹料料理
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                熟食/冷藏、冷凍食品
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                米/麵條
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                調理包/料理包
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                調味料/醬料
              </a>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            其他
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                其他
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* 購物進度條 */}
      <div className={styles.sectionBar + " mt-5"}>
        {/* <div className="w-75 d-flex justify-content-between"> */}
        <a href="" className={styles.firstStep}>
          <p className="text-start ">顧客</p>
        </a>

        <a href="" className={styles.firstStep}>
          <p className="text-start">配送</p>
        </a>

        <a href="" className={styles.step}>
          <p className="text-start">付款</p>
        </a>

        <a href="" className={styles.lastStep}>
          <p className="text-start">檢視</p>
        </a>

        {/* </div> */}
      </div>

      {/* 訂購人資訊 */}
      <form
        className={styles.buyerinfo + " container mt-5 w-50"}
        onSubmit={handleSubmit}
      >
        <div className={styles.buyertitle + " pb-1"}>訂購人資訊</div>
        <div className="row mt-3 mb-2">
          <label htmlFor="buyer" className="form-label col-2 col-form-label">
            姓名
          </label>
          <div
            style={{
              color: "red",
              fontSize: "13px",
            }}
          >
            {errors.purchaserName}
          </div>
          <div className="col-12">
            <input
              type="text"
              className={styles.inputframe + " purchaserName"}
              id="buyer"
              placeholder=" 請輸入姓名"
              autoFocus
              onChange={handleFieldChange}
            />
          </div>
        </div>

                {/* 手機號碼 */}
                <div className="row mb-2">
                    <label htmlFor="telnumber" className="form-label col-2 col-form-label">手機號碼</label>
                    <div className="col-12">
                        <input type="text" className={styles.inputframe} id="telnumber" placeholder=" 請輸入手機號碼" />
                    </div>
                </div>

                {/* 電子信箱 */}
                <div className="row mb-2">
                    <label htmlFor="email" className="form-label col-2 col-form-label">電子信箱</label>
                    <div className="col-12">
                        <input type="text" className={styles.inputframe} id="email" placeholder=" 請輸入e-mail" />
                    </div>
                </div>

                {/* 地址 */}
                <div className="row mb-2">
                    <label htmlFor="placeaddress" className="form-label col-12 col-form-label">地址</label>
                    <div className={styles.sortaddress}>
                        <select className={styles.selectbox}>
                            <option value="taipei">台北市</option>
                            <option value="taichung">台中市</option>
                        </select>
                    </div>
                    <div className={styles.sortaddress + " me-3"}>
                    <select className={styles.selectbox}>
                            <option value="district1">西屯區</option>
                            <option value="district2">北區</option>
                        </select>
                    </div>

                    <div className={styles.sortaddress2}>
                        <input type="text" className={styles.addressdetail} id="placeaddress" placeholder=" 請輸入地址" />
                    </div>

                        
                    
                </div>

        {/* part2 */}

                    <div className={styles.buyertitle + " mt-3 pb-1"}>收件人資訊</div>
                    <div className="row mt-3 mb-2">
                        <label htmlFor="buyer" className="form-label col-2 col-form-label">姓名</label>
                        <div className="col-12">
                            <input type="text" className={styles.inputframe} id="buyer" placeholder=" 請輸入姓名" autoFocus />
                        </div>
                    </div>

                {/* 手機號碼 */}
                <div className="row mb-2">
                    <label htmlFor="telnumber" className="form-label col-2 col-form-label">手機號碼</label>
                    <div className="col-12">
                        <input type="text" className={styles.inputframe} id="telnumber" placeholder=" 請輸入手機號碼" />
                    </div>
                </div>

                {/* 地址 */}
                <div className="row mb-2">
                    <label htmlFor="readdress" className="form-label col-12 col-form-label">地址</label>
                    <div className={styles.sortaddress}>
                        <select className={styles.selectbox}>
                            <option value="taipei">台北市</option>
                            <option value="taichung">台中市</option>
                        </select>
                    </div>
                    <div className={styles.sortaddress + " me-3"}>
                        <select className={styles.selectbox}>
                            <option value="district1">西屯區</option>
                            <option value="district2">北區</option>
                        </select>
                    </div>

                    <div className={styles.sortaddress2}>
                        <input type="text" className={styles.addressdetail} id="readdress" placeholder=" 請輸入地址" />
                    </div>
                </div>
                {/* part3 */}
                <div className={styles.buyertitle + " mt-3 pb-1"}>配送資訊</div>
                <div className="row mt-3 mb-2">
                    <label htmlFor="buyer" className="form-label col-2 col-form-label">配送時間</label>
                    <div className="col-12">
                        <input type="text" className={styles.inputframe} id="buyer" value=" 不指定"/>
                    </div>
                </div>

        <div className="container mt-5 d-flex justify-content-center">
          <div className="row">
            <div className="col-12">
              ※下單前請再次確認您的購買明細及配送資訊，訂單成立後無法異動訂單內容
            </div>
          </div>
        </div>

                <div className="container d-flex justify-content-center">
                <a href="/cart"><button className="btn btn-middle mt-5 mb-5 me-3">修改訂單</button></a>
                <a href="/cart/pay-method"><button className="btn btn-middle mt-5 mb-5 ms-3">前往付款方式</button></a>
                </div>
            </div>

      <Footer />
    </>
  );
}
