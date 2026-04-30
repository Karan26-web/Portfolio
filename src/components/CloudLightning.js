export const CloudLightning = () => (
  <div className="cloud-lightning-wrap" aria-hidden="true">
    <svg
      className="cloud-svg"
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="cloud-deep" x="-5%" y="-30%" width="110%" height="180%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id="cloud-mid" x="-5%" y="-30%" width="110%" height="180%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="cloud-wisp" x="-5%" y="-30%" width="110%" height="180%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        {/* Fades to transparent at the bottom — no hard edge */}
        <linearGradient id="cloud-fade-main" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1c2b42" stopOpacity="0.65" />
          <stop offset="55%"  stopColor="#111e30" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0d1825" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cloud-fade-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0e1a2c" stopOpacity="0.7" />
          <stop offset="60%"  stopColor="#0a1220" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0a1220" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cloud-fade-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1e2e46" stopOpacity="0.6" />
          <stop offset="50%"  stopColor="#141f33" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0d1825" stopOpacity="0" />
        </linearGradient>

      </defs>

      {/* Back depth layer */}
      <path
        d="M0,160 L0,48 Q45,20 95,40 Q140,56 195,26 Q245,4 300,30 Q350,52 405,22 Q455,0 510,26 Q558,48 612,18 Q660,0 715,24 Q762,46 818,16 Q865,0 920,24 Q968,46 1022,18 Q1070,0 1125,26 Q1172,48 1228,18 Q1276,0 1330,28 Q1378,50 1440,32 L1440,160 Z"
        fill="url(#cloud-fade-back)" filter="url(#cloud-deep)"
      />

      {/* Main cloud band */}
      <path
        d="M0,160 L0,62 Q32,40 66,54 Q96,65 130,46 Q162,30 196,50 Q226,66 262,46 Q295,28 332,50 Q364,66 400,46 Q432,28 468,50 Q500,66 536,46 Q568,28 605,50 Q637,66 673,46 Q706,28 743,50 Q775,66 811,46 Q843,28 880,50 Q912,66 948,46 Q980,28 1018,50 Q1050,66 1086,46 Q1118,28 1155,50 Q1187,66 1223,46 Q1256,28 1292,50 Q1324,66 1360,46 Q1394,30 1440,52 L1440,160 Z"
        fill="url(#cloud-fade-main)" filter="url(#cloud-mid)"
      />

      {/* Fine wispy front layer */}
      <path
        d="M0,160 L0,75 Q24,62 50,70 Q74,78 100,66 Q124,55 152,68 Q177,79 205,66 Q230,54 258,68 Q283,79 311,66 Q337,54 366,68 Q392,79 420,65 Q446,53 475,67 Q500,78 528,65 Q554,53 582,67 Q608,79 636,65 Q662,52 690,67 Q716,79 744,65 Q770,52 798,67 Q824,79 852,65 Q878,52 907,67 Q933,79 960,65 Q986,52 1015,67 Q1040,79 1068,65 Q1094,52 1122,67 Q1148,79 1176,65 Q1202,52 1230,68 Q1256,80 1285,66 Q1312,54 1342,70 Q1372,82 1406,66 Q1426,57 1440,70 L1440,160 Z"
        fill="url(#cloud-fade-front)" filter="url(#cloud-wisp)"
      />

    </svg>
  </div>
);
