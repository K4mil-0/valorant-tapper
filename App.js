import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  StatusBar, 
  ScrollView, 
  Alert, 
  Modal, 
  TextInput,
  Animated,
  Easing
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MAPS_DATA = [
  {
    id: 'ascent', name: 'Ascent', hp: 1000,
    skins: [
      { id: 'asc_1', name: 'Classic Prime', rarity: 'common', searchKey: 'prime classic' },
      { id: 'asc_2', name: 'Ghost Reaver', rarity: 'common', searchKey: 'reaver ghost' },
      { id: 'asc_3', name: 'Spectre Prime', rarity: 'common', searchKey: 'prime spectre' },
      { id: 'asc_4', name: 'Judge Glitchpop', rarity: 'common', searchKey: 'glitchpop judge' },
      { id: 'asc_5', name: 'Phantom BlastX', rarity: 'common', searchKey: 'blastx phantom' },
      { id: 'asc_6', name: 'Vandal Reaver', rarity: 'common', searchKey: 'reaver vandal' },
      { id: 'asc_7', name: 'Marshal Gaia', rarity: 'common', searchKey: "gaia's vengeance marshal" },
      { id: 'asc_8', name: 'Karambit Champions 2021', rarity: 'legendary', searchKey: 'champions 2021 karambit' },
      { id: 'asc_9', name: 'Butterfly RGX', rarity: 'legendary', searchKey: 'rgx 11z pro firefly' },
      { id: 'asc_10', name: 'Reaver Karambit', rarity: 'legendary', searchKey: 'reaver karambit' },
    ]
  },
  {
    id: 'bind', name: 'Bind', hp: 5000,
    skins: [
      { id: 'bnd_1', name: 'Sheriff Ion', rarity: 'common', searchKey: 'ion sheriff' },
      { id: 'bnd_2', name: 'Bucky Oni', rarity: 'common', searchKey: 'oni bucky' },
      { id: 'bnd_3', name: 'Stinger Prelude', rarity: 'common', searchKey: 'prelude to chaos stinger' },
      { id: 'bnd_4', name: 'Guardian Reaver', rarity: 'common', searchKey: 'reaver guardian' },
      { id: 'bnd_5', name: 'Ares Singularity', rarity: 'common', searchKey: 'singularity ares' },
      { id: 'bnd_6', name: 'Odin Glitchpop', rarity: 'common', searchKey: 'glitchpop odin' },
      { id: 'bnd_7', name: 'Operator Ion', rarity: 'common', searchKey: 'ion operator' },
      { id: 'bnd_8', name: 'Xenohunter Knife', rarity: 'legendary', searchKey: 'xenohunter knife' },
      { id: 'bnd_9', name: 'Celestial Fan', rarity: 'legendary', searchKey: 'celestial fan' },
      { id: 'bnd_10', name: 'Elderflame Dagger', rarity: 'legendary', searchKey: 'elderflame dagger' },
    ]
  },
  {
    id: 'haven', name: 'Haven', hp: 25000,
    skins: [
      { id: 'hvn_1', name: 'Frenzy Elderflame', rarity: 'common', searchKey: 'elderflame frenzy' },
      { id: 'hvn_2', name: 'Bulldog Araxys', rarity: 'common', searchKey: 'araxys bulldog' },
      { id: 'hvn_3', name: 'Phantom Recon', rarity: 'common', searchKey: 'recon phantom' },
      { id: 'hvn_4', name: 'Vandal Neptune', rarity: 'common', searchKey: 'neptune vandal' },
      { id: 'hvn_5', name: 'Sheriff ChronoVoid', rarity: 'common', searchKey: 'chronovoid sheriff' },
      { id: 'hvn_6', name: 'Marshal Neo Frontier', rarity: 'common', searchKey: 'neo frontier marshal' },
      { id: 'hvn_7', name: 'Operator Prelude', rarity: 'common', searchKey: 'prelude to chaos operator' },
      { id: 'hvn_8', name: 'Kuronami No Yaiba', rarity: 'legendary', searchKey: 'kuronami no yaiba' },
      { id: 'hvn_9', name: 'Prime Axe', rarity: 'legendary', searchKey: 'prime axe' },
      { id: 'hvn_10', name: 'Glitchpop Dagger', rarity: 'legendary', searchKey: 'glitchpop dagger' },
    ]
  },
  {
    id: 'icebox', name: 'Icebox', hp: 150000,
    skins: [
      { id: 'icb_1', name: 'Ghost Gaia', rarity: 'common', searchKey: "gaia's vengeance ghost" },
      { id: 'icb_2', name: 'Spectre Neptune', rarity: 'common', searchKey: 'neptune spectre' },
      { id: 'icb_3', name: 'Phantom Oni', rarity: 'common', searchKey: 'oni phantom' }, 
      { id: 'icb_4', name: 'Vandal Prelude', rarity: 'common', searchKey: 'prelude to chaos vandal' },
      { id: 'icb_5', name: 'Outlaw RGX', rarity: 'common', searchKey: 'rgx 11z pro outlaw' },
      { id: 'icb_6', name: 'Sheriff Neo Frontier', rarity: 'common', searchKey: 'neo frontier sheriff' },
      { id: 'icb_7', name: 'Operator Araxys', rarity: 'common', searchKey: 'araxys operator' },
      { id: 'icb_8', name: 'Champions 2024 Blade', rarity: 'legendary', searchKey: 'champions 2024 blade' },
      { id: 'icb_9', name: 'Onimaru Kunitsuna', rarity: 'legendary', searchKey: 'onimaru kunitsuna' },
      { id: 'icb_10', name: 'Relic of the Sentinel', rarity: 'legendary', searchKey: 'relic of the sentinel' },
    ]
  },
  {
    id: 'split', name: 'Split', hp: 1000000,
    skins: [
      { id: 'spl_1', name: 'Classic Glitchpop', rarity: 'common', searchKey: 'glitchpop classic' }, 
      { id: 'spl_2', name: 'Ghost Magepunk', rarity: 'common', searchKey: 'magepunk ghost' },
      { id: 'spl_3', name: 'Stinger RGX', rarity: 'common', searchKey: 'rgx 11z pro stinger' },
      { id: 'spl_4', name: 'Bulldog Protocol', rarity: 'common', searchKey: 'protocol 781-a bulldog' },
      { id: 'spl_5', name: 'Guardian Ruination', rarity: 'common', searchKey: 'ruination guardian' }, 
      { id: 'spl_6', name: 'Phantom Oni', rarity: 'common', searchKey: 'oni phantom' },
      { id: 'spl_7', name: 'Vandal Araxys', rarity: 'common', searchKey: 'araxys vandal' },
      { id: 'spl_8', name: 'Sovereign Sword', rarity: 'legendary', searchKey: 'sovereign sword' },
      { id: 'spl_9', name: 'RGX Blade', rarity: 'legendary', searchKey: 'rgx 11z pro blade' },
      { id: 'spl_10', name: 'Protocol Knife', rarity: 'legendary', searchKey: 'personal administrative melee unit' },
    ]
  },
  {
    id: 'breeze', name: 'Breeze', hp: 8000000,
    skins: [
      { id: 'brz_1', name: 'Shorty Araxys', rarity: 'common', searchKey: 'araxys shorty' },
      { id: 'brz_2', name: 'Sheriff Magepunk', rarity: 'common', searchKey: 'magepunk sheriff' },
      { id: 'brz_3', name: 'Spectre Ruination', rarity: 'common', searchKey: 'ruination spectre' },
      { id: 'brz_4', name: 'Phantom Ion', rarity: 'common', searchKey: 'ion phantom' },
      { id: 'brz_5', name: 'Vandal ChronoVoid', rarity: 'common', searchKey: 'chronovoid vandal' },
      { id: 'brz_6', name: 'Marshal Neo Frontier', rarity: 'common', searchKey: 'neo frontier marshal' }, 
      { id: 'brz_7', name: 'Operator Forsaken', rarity: 'common', searchKey: 'forsaken operator' },
      { id: 'brz_8', name: 'Ruined King Sword', rarity: 'legendary', searchKey: 'broken blade of the ruined king' },
      { id: 'brz_9', name: 'ChronoVoid Terminus', rarity: 'legendary', searchKey: 'terminus a quo' },
      { id: 'brz_10', name: 'Champions Butterfly', rarity: 'legendary', searchKey: 'champions 2022 butterfly knife' },
    ]
  },
  {
    id: 'fracture', name: 'Fracture', hp: 65000000,
    skins: [
      { id: 'frc_1', name: 'Classic RGX', rarity: 'common', searchKey: 'rgx 11z pro classic' },
      { id: 'frc_2', name: 'Frenzy Ion', rarity: 'common', searchKey: 'ion frenzy' },
      { id: 'frc_3', name: 'Judge ChronoVoid', rarity: 'common', searchKey: 'chronovoid judge' },
      { id: 'frc_4', name: 'Vandal Origin', rarity: 'common', searchKey: 'origin vandal' },
      { id: 'frc_5', name: 'Phantom Ruination', rarity: 'common', searchKey: 'ruination phantom' },
      { id: 'frc_6', name: 'Operator Origin', rarity: 'common', searchKey: 'origin operator' }, 
      { id: 'frc_7', name: 'Ares Magepunk', rarity: 'common', searchKey: 'magepunk ares' },
      { id: 'frc_8', name: 'Origin Crescent Blade', rarity: 'legendary', searchKey: 'origin crescent blade' },
      { id: 'frc_9', name: 'Spectrum Waveform', rarity: 'legendary', searchKey: 'waveform' },
      { id: 'frc_10', name: 'Ion Karambit', rarity: 'legendary', searchKey: 'ion karambit' }, 
    ]
  },
  {
    id: 'pearl', name: 'Pearl', hp: 500000000,
    skins: [
      { id: 'prl_1', name: 'Ghost Sovereign', rarity: 'common', searchKey: 'sovereign ghost' },
      { id: 'prl_2', name: 'Sheriff Reaver', rarity: 'common', searchKey: 'reaver sheriff' },
      { id: 'prl_3', name: 'Spectre Ion', rarity: 'common', searchKey: 'ion spectre' },
      { id: 'prl_4', name: 'Guardian Magepunk', rarity: 'common', searchKey: 'magepunk guardian' },
      { id: 'prl_5', name: 'Vandal Kuronami', rarity: 'common', searchKey: 'kuronami vandal' },
      { id: 'prl_6', name: 'Phantom Radiant System', rarity: 'common', searchKey: 'radiant entertainment system phantom' },
      { id: 'prl_7', name: 'Phantom ChronoVoid', rarity: 'common', searchKey: 'chronovoid phantom' },
      { id: 'prl_8', name: 'Recon Balisong', rarity: 'legendary', searchKey: 'recon balisong' },
      { id: 'prl_9', name: 'Magepunk Sparkswitch', rarity: 'legendary', searchKey: 'magepunk sparkswitch' },
      { id: 'prl_10', name: 'Prism Knife', rarity: 'legendary', searchKey: 'prism knife' }, 
    ]
  },
  {
    id: 'lotus', name: 'Lotus', hp: 4000000000,
    skins: [
      { id: 'lot_1', name: 'Classic Spectrum', rarity: 'common', searchKey: 'spectrum classic' }, 
      { id: 'lot_2', name: 'Ghost Ruination', rarity: 'common', searchKey: 'ruination ghost' },
      { id: 'lot_3', name: 'Sheriff Kuronami', rarity: 'common', searchKey: 'kuronami sheriff' },
      { id: 'lot_4', name: 'Bulldog Glitchpop', rarity: 'common', searchKey: 'glitchpop bulldog' },
      { id: 'lot_5', name: 'Vandal Prime', rarity: 'common', searchKey: 'prime vandal' },
      { id: 'lot_6', name: 'Phantom Glitchpop', rarity: 'common', searchKey: 'glitchpop phantom' },
      { id: 'lot_7', name: 'Operator Magepunk', rarity: 'common', searchKey: 'magepunk operator' },
      { id: 'lot_8', name: 'Prime 2.0 Karambit', rarity: 'legendary', searchKey: 'prime//2.0 karambit' },
      { id: 'lot_9', name: 'Glitchpop Axe', rarity: 'legendary', searchKey: 'glitchpop axe' },
      { id: 'lot_10', name: 'Neo Frontier Axe', rarity: 'legendary', searchKey: 'neo frontier axe' },
    ]
  },
  {
    id: 'sunset', name: 'Sunset', hp: 35000000000,
    skins: [
      { id: 'sns_1', name: 'Ghost Magepunk', rarity: 'common', searchKey: 'magepunk ghost' }, 
      { id: 'sns_2', name: 'Sheriff Sentinels', rarity: 'common', searchKey: 'sentinels of light sheriff' },
      { id: 'sns_3', name: 'Spectre Primordium', rarity: 'common', searchKey: 'primordium spectre' },
      { id: 'sns_4', name: 'Vandal Imperium', rarity: 'common', searchKey: 'imperium vandal' },
      { id: 'sns_5', name: 'Phantom Radiant Crisis', rarity: 'common', searchKey: 'radiant crisis 001 phantom' },
      { id: 'sns_6', name: 'Marshal Sovereign', rarity: 'common', searchKey: 'sovereign marshal' },
      { id: 'sns_7', name: 'Operator Forsaken', rarity: 'common', searchKey: 'forsaken operator' },
      { id: 'sns_8', name: 'Blades of Primordia', rarity: 'legendary', searchKey: 'blades of primordia' },
      { id: 'sns_9', name: 'Misericórdia', rarity: 'legendary', searchKey: 'vct lock//in misericórdia' },
      { id: 'sns_10', name: 'Blades of Imperium', rarity: 'legendary', searchKey: 'blades of imperium' },
    ]
  },
  {
    id: 'abyss', name: 'Abyss', hp: 300000000000,
    skins: [
      { id: 'abs_1', name: 'Ghost Evori', rarity: 'common', searchKey: "evori" }, 
      { id: 'abs_2', name: 'Frenzy Sovereign', rarity: 'common', searchKey: 'sovereign frenzy' },
      { id: 'abs_3', name: 'Spectre Evori', rarity: 'common', searchKey: "evori spectre" }, 
      { id: 'abs_4', name: 'Guardian Ruination', rarity: 'common', searchKey: 'ruination guardian' },
      { id: 'abs_5', name: 'Vandal Evori', rarity: 'common', searchKey: "evori vandal" }, 
      { id: 'abs_6', name: 'Phantom Singularity', rarity: 'common', searchKey: 'singularity phantom' },
      { id: 'abs_7', name: 'Operator Radiant Sys', rarity: 'common', searchKey: 'radiant entertainment system operator' },
      { id: 'abs_8', name: 'Evori Spellcaster', rarity: 'legendary', searchKey: "spellcaster" }, 
      { id: 'abs_9', name: 'Champions 2023 Kunai', rarity: 'legendary', searchKey: 'champions 2023 kunai' },
      { id: 'abs_10', name: 'Oni Claw', rarity: 'legendary', searchKey: 'oni claw' },
    ]
  },
  {
    id: 'corrode', name: 'Corrode', hp: 2500000000000,
    skins: [
      { id: 'crd_1', name: 'Shorty Oni', rarity: 'common', searchKey: 'oni shorty' },
      { id: 'crd_2', name: 'Sheriff Protocol', rarity: 'common', searchKey: 'protocol 781-a sheriff' },
      { id: 'crd_3', name: 'Spectre Singularity', rarity: 'common', searchKey: 'singularity spectre' },
      { id: 'crd_4', name: 'Vandal Xerøfang', rarity: 'common', searchKey: 'xerøfang vandal' }, 
      { id: 'crd_5', name: 'Phantom Protocol', rarity: 'common', searchKey: 'protocol 781-a phantom' },
      { id: 'crd_6', name: 'Ghost Xerøfang', rarity: 'common', searchKey: 'xerøfang ghost' }, 
      { id: 'crd_7', name: 'Operator Ion', rarity: 'common', searchKey: 'ion operator' },
      { id: 'crd_8', name: 'Xerøfang Knife', rarity: 'legendary', searchKey: 'xerøfang knife' }, 
      { id: 'crd_9', name: 'Singularity Knife', rarity: 'legendary', searchKey: 'singularity knife' },
      { id: 'crd_10', name: 'Prime Axe', rarity: 'legendary', searchKey: 'prime axe' },
    ]
  },
  {
    id: 'summit', name: 'Summit', hp: 50000000000000,
    skins: [
      { id: 'sum_1', name: 'Frenzy Prime', rarity: 'common', searchKey: 'prime frenzy' },
      { id: 'sum_2', name: 'Stinger Prelude', rarity: 'common', searchKey: 'prelude to chaos stinger' }, 
      { id: 'sum_3', name: 'Sheriff Kuronami', rarity: 'common', searchKey: 'kuronami sheriff' },
      { id: 'sum_4', name: 'Vandal Champions 2021', rarity: 'common', searchKey: 'champions 2021 vandal' },
      { id: 'sum_5', name: 'Phantom Champions 2022', rarity: 'common', searchKey: 'champions 2022 phantom' },
      { id: 'sum_6', name: 'Operator Elderflame', rarity: 'common', searchKey: 'elderflame operator' },
      { id: 'sum_7', name: 'Judge Elderflame', rarity: 'common', searchKey: 'elderflame judge' },
      { id: 'sum_8', name: 'Ignite Fan', rarity: 'legendary', searchKey: 'ignite fan' },
      { id: 'sum_9', name: 'Radiant Crisis Bat', rarity: 'legendary', searchKey: 'radiant crisis 001 baseball bat' },
      { id: 'sum_10', name: 'Ion Energy Sword', rarity: 'legendary', searchKey: 'ion energy sword' },
    ]
  },
];

const DEFAULT_AGENTS = [
  { id: 'fade', name: 'Fade', basePrice: 100, dps: 2, level: 0 },
  { id: 'brimstone', name: 'Brimstone', basePrice: 250, dps: 5, level: 0 },
  { id: 'killjoy', name: 'Killjoy', basePrice: 750, dps: 15, level: 0 },
  { id: 'sova', name: 'Sova', basePrice: 2000, dps: 40, level: 0 },
  { id: 'reyna', name: 'Reyna', basePrice: 5000, dps: 100, level: 0 },
  { id: 'jett', name: 'Jett', basePrice: 12500, dps: 250, level: 0 },
  { id: 'yoru', name: 'Yoru', basePrice: 30000, dps: 600, level: 0 },
  { id: 'astra', name: 'Astra', basePrice: 75000, dps: 1500, level: 0 },
  { id: 'breach', name: 'Breach', basePrice: 200000, dps: 4000, level: 0 },
  { id: 'chamber', name: 'Chamber', basePrice: 500000, dps: 10000, level: 0 },
  { id: 'clove', name: 'Clove', basePrice: 1250000, dps: 25000, level: 0 },
  { id: 'cypher', name: 'Cypher', basePrice: 3000000, dps: 60000, level: 0 },
  { id: 'deadlock', name: 'Deadlock', basePrice: 7500000, dps: 150000, level: 0 },
  { id: 'gekko', name: 'Gekko', basePrice: 20000000, dps: 400000, level: 0 },
  { id: 'harbor', name: 'Harbor', basePrice: 50000000, dps: 1000000, level: 0 },
  { id: 'iso', name: 'Iso', basePrice: 125000000, dps: 2500000, level: 0 },
  { id: 'kay/o', name: 'KAY/O', basePrice: 300000000, dps: 6000000, level: 0 },
  { id: 'miks', name: 'Miks', basePrice: 750000000, dps: 15000000, level: 0 },
  { id: 'neon', name: 'Neon', basePrice: 2000000000, dps: 40000000, level: 0 },
  { id: 'phoenix', name: 'Phoenix', basePrice: 5000000000, dps: 100000000, level: 0 },
  { id: 'raze', name: 'Raze', basePrice: 12500000000, dps: 250000000, level: 0 },
  { id: 'sage', name: 'Sage', basePrice: 30000000000, dps: 600000000, level: 0 },
  { id: 'skye', name: 'Skye', basePrice: 75000000000, dps: 1500000000, level: 0 },
  { id: 'tejo', name: 'Tejo', basePrice: 200000000000, dps: 4000000000, level: 0 },
  { id: 'viper', name: 'Viper', basePrice: 500000000000, dps: 10000000000, level: 0 },
  { id: 'veto', name: 'Veto', basePrice: 1250000000000, dps: 25000000000, level: 0 },
  { id: 'vyse', name: 'Vyse', basePrice: 3000000000000, dps: 60000000000, level: 0 },
  { id: 'waylay', name: 'Waylay', basePrice: 7500000000000, dps: 150000000000, level: 0 },
  { id: 'omen', name: 'Omen 👑', basePrice: 25000000000000, dps: 500000000000, level: 0 },
];

const RANKS = [
  'Iron 1', 'Iron 2', 'Iron 3',
  'Bronze 1', 'Bronze 2', 'Bronze 3',
  'Silver 1', 'Silver 2', 'Silver 3',
  'Gold 1', 'Gold 2', 'Gold 3',
  'Platinum 1', 'Platinum 2', 'Platinum 3',
  'Diamond 1', 'Diamond 2', 'Diamond 3',
  'Ascendant 1', 'Ascendant 2', 'Ascendant 3',
  'Immortal 1', 'Immortal 2', 'Immortal 3',
  'Radiant'
];

const generateMissionsForRank = (rIndex) => {
  const mult = rIndex + 1;
  return [
    { id: 0, type: 'tap', desc: `Tapnij ${100 * mult} razy`, target: 100 * mult, progress: 0, reward: 500 * mult * mult, claimed: false },
    { id: 1, type: 'damage', desc: `Zadaj ${Math.floor(5000 * Math.pow(2.5, rIndex)).toLocaleString()} DMG`, target: 5000 * Math.pow(2.5, rIndex), progress: 0, reward: 1000 * mult * mult, claimed: false },
    { id: 2, type: 'sell', desc: `Sprzedaj ${2 * mult} skinów`, target: 2 * mult, progress: 0, reward: 800 * mult * mult, claimed: false },
  ];
};

const getSkinBonus = (skin, mapIdx) => {
  const base = skin.rarity === 'legendary' ? 25 : 5;
  const multipliers = [1, 5, 25, 125, 600, 3000, 15000, 75000, 350000, 1500000, 8000000, 40000000, 200000000];
  const mult = multipliers[mapIdx] !== undefined ? multipliers[mapIdx] : (mapIdx + 1);
  return base * mult;
};

const AbilityFloat = ({ ability }) => {
  const animY = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animY, { toValue: -120, duration: 2500, useNativeDriver: true }),
      Animated.timing(animOpacity, { toValue: 0, duration: 2500, delay: 500, useNativeDriver: true })
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.abilityFloatContainer, { transform: [{ translateY: animY }], opacity: animOpacity }]} pointerEvents="none">
      {ability.icon && <Image source={{uri: ability.icon}} style={styles.abilityFloatIcon} />}
      <View>
        <Text style={styles.abilityFloatAgent}>{ability.agentName} odpala skill!</Text>
        <Text style={styles.abilityFloatDmg}>-{ability.dmg.toLocaleString()} DMG</Text>
      </View>
    </Animated.View>
  );
};

const SkinImage = ({ skinName, iconUrl, style }) => {
  const [failed, setFailed] = useState(false);
  if (!iconUrl || failed) {
    const initials = skinName ? skinName.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() : 'VA';
    return (
      <View style={[styles.skinIconFallback, style]}>
        <Text style={styles.fallbackText}>{initials}</Text>
      </View>
    );
  }
  return <Image source={{ uri: iconUrl }} style={style} resizeMode="contain" onError={() => setFailed(true)} />;
};

export default function App() {
  const [creds, setCreds] = useState(0);
  const [currentMapIndex, setCurrentMapIndex] = useState(0);
  const [hp, setHp] = useState(MAPS_DATA[0].hp);
  const [clickDmg, setClickDmg] = useState(5);
  const [activeTab, setActiveTab] = useState('game');
  
  const [agents, setAgents] = useState(DEFAULT_AGENTS);
  const [inventory, setInventory] = useState({});
  const [equippedSkinId, setEquippedSkinId] = useState(null);
  const [lastDroppedSkin, setLastDroppedSkin] = useState(null);

  const [rankIndex, setRankIndex] = useState(0);
  const [missions, setMissions] = useState(generateMissionsForRank(0));
  const [devRankMode, setDevRankMode] = useState(false); 

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false); // NOWY STAN DLA PORADNIKA
  const [redeemCode, setRedeemCode] = useState('');

  const [knifeModalSkin, setKnifeModalSkin] = useState(null);
  const [inspectSkinModal, setInspectSkinModal] = useState(null); 
  const [floatingText, setFloatingText] = useState(null);
  
  const [offlineReport, setOfflineReport] = useState(null); 
  const [activeAbilities, setActiveAbilities] = useState([]);

  const [currentDrop, setCurrentDrop] = useState(null);
  const dropAlertAnim = useRef(new Animated.Value(-150)).current;
  const dropTimeoutRef = useRef(null);
  
  const shotAnim = useRef(new Animated.Value(1)).current;
  const flashAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const knifeScaleAnim = useRef(new Animated.Value(0)).current;
  const inspectScaleAnim = useRef(new Animated.Value(0)).current;

  const [mapIcons, setMapIcons] = useState({});
  const [agentIcons, setAgentIcons] = useState({});
  const [agentAbilities, setAgentAbilities] = useState({});
  const [skinList, setSkinList] = useState([]);
  const [rankIcons, setRankIcons] = useState([]); 

  const agentsRef = useRef(agents);
  const currentMapIndexRef = useRef(currentMapIndex);

  useEffect(() => { agentsRef.current = agents; }, [agents]);
  useEffect(() => { currentMapIndexRef.current = currentMapIndex; }, [currentMapIndex]);

  useEffect(() => {
    fetchApiAssets();
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [creds, currentMapIndex, hp, clickDmg, agents, inventory, equippedSkinId, rankIndex, missions, devRankMode]);

  useEffect(() => {
    if (currentMapIndex > 0) {
      const prevMap = MAPS_DATA[currentMapIndex - 1];
      const unlockedCount = prevMap.skins.filter(s => (inventory[s.id] || 0) > 0).length;
      if (unlockedCount < 8) {
        setCurrentMapIndex(0);
        setHp(MAPS_DATA[0].hp);
        Alert.alert('Blokada Mapy', 'Sprzedałeś kluczowego skina! Nie masz już wymaganych 8/10 skinów z poprzedniej mapy. Wróciliśmy Cię na Ascent.');
      }
    }
  }, [inventory, currentMapIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      const totalDps = agentsRef.current.reduce((sum, a) => sum + (a.dps * a.level), 0);
      if (totalDps > 0) {
        applyDamage(totalDps);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const skillTimer = setInterval(() => {
      const maxedAgents = agentsRef.current.filter(a => a.level >= 4);
      if (maxedAgents.length > 0) {
        const randomAgent = maxedAgents[Math.floor(Math.random() * maxedAgents.length)];
        const skillDmg = randomAgent.dps * 30; 
        
        const key = randomAgent.id.toLowerCase().replace(' 👑', '');
        const iconList = agentAbilities[key];
        const icon = iconList && iconList.length > 0 ? iconList[Math.floor(Math.random() * iconList.length)] : null;
        
        const abilityId = Date.now().toString();
        
        setActiveAbilities(prev => [...prev, { id: abilityId, agentName: randomAgent.name, dmg: skillDmg, icon }]);
        applyDamage(skillDmg);

        setTimeout(() => {
          setActiveAbilities(prev => prev.filter(a => a.id !== abilityId));
        }, 3000); 
      }
    }, 8000);
    return () => clearInterval(skillTimer);
  }, [agentAbilities]);

  const updateMissionProgress = (type, amount) => {
    setMissions(prev => {
      let changed = false;
      const next = prev.map(m => {
        if (m.type === type && !m.claimed && m.progress < m.target) {
          changed = true;
          return { ...m, progress: Math.min(m.target, m.progress + amount) };
        }
        return m;
      });
      return changed ? next : prev;
    });
  };

  const claimMission = (mId) => {
    setMissions(prev => {
      return prev.map(m => {
        if (m.id === mId && m.progress >= m.target && !m.claimed) {
          setCreds(c => c + m.reward);
          return { ...m, claimed: true };
        }
        return m;
      });
    });
  };

  const handleRankUp = () => {
    const nextRank = rankIndex + 1;
    if (nextRank < RANKS.length) {
      setRankIndex(nextRank);
      setMissions(generateMissionsForRank(nextRank));
      Alert.alert('AWANS!', `Gratulacje! Awansujesz na rangę: ${RANKS[nextRank]}!`);
    }
  };

  const showCustomDropAlert = (skin, map) => {
    setCurrentDrop({ skin, mapName: map.name });
    Animated.spring(dropAlertAnim, { toValue: 20, friction: 6, useNativeDriver: true }).start();

    if (dropTimeoutRef.current) clearTimeout(dropTimeoutRef.current);
    dropTimeoutRef.current = setTimeout(() => {
      Animated.timing(dropAlertAnim, { toValue: -150, duration: 300, useNativeDriver: true }).start();
    }, 2000);
  };

  const triggerShotAnimation = (dmgVal) => {
    shotAnim.setValue(0.92);
    flashAnim.setValue(0.8);
    floatAnim.setValue(0);
    setFloatingText(`-${dmgVal.toLocaleString()}`);

    Animated.parallel([
      Animated.spring(shotAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
      Animated.timing(flashAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(floatAnim, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true })
    ]).start();
  };

  const triggerKnifeAnimation = (skin) => {
    setKnifeModalSkin(skin);
    knifeScaleAnim.setValue(0);
    Animated.spring(knifeScaleAnim, { toValue: 1, friction: 4, tension: 40, useNativeDriver: true }).start();
  };

  const triggerInspectAnimation = (skin, mapIdx) => {
    setInspectSkinModal({ skin, mapIdx });
    inspectScaleAnim.setValue(0);
    Animated.spring(inspectScaleAnim, { toValue: 1, friction: 5, tension: 40, useNativeDriver: true }).start();
  };

  const fetchApiAssets = async () => {
    try {
      const mapsRes = await fetch('https://valorant-api.com/v1/maps?language=pl-PL');
      const mapsData = await mapsRes.json();
      const mapMap = {};
      mapsData.data?.forEach(m => { mapMap[m.displayName.toLowerCase()] = m.listViewIcon || m.displayIcon; });
      setMapIcons(mapMap);

      const agentsRes = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=pl-PL');
      const agentsData = await agentsRes.json();
      const agMap = {};
      const abMap = {};
      agentsData.data?.forEach(a => {
        agMap[a.displayName.toLowerCase()] = a.displayIcon;
        if (a.abilities && a.abilities.length > 0) {
          abMap[a.displayName.toLowerCase()] = a.abilities.map(ab => ab.displayIcon).filter(Boolean);
        }
      });
      setAgentIcons(agMap);
      setAgentAbilities(abMap);

      const skinsRes = await fetch('https://valorant-api.com/v1/weapons/skins?language=en-US');
      const skinsData = await skinsRes.json();
      const fetchedSkins = [];
      skinsData.data?.forEach(s => {
        let icon = s.displayIcon;
        if (!icon && s.levels) {
          for (const lvl of s.levels) { if (lvl.displayIcon) { icon = lvl.displayIcon; break; } }
        }
        if (!icon && s.chromas) {
          for (const chroma of s.chromas) { if (chroma.displayIcon) { icon = chroma.displayIcon; break; } if (chroma.fullRender) { icon = chroma.fullRender; break; } }
        }
        if (icon && s.displayName) {
          fetchedSkins.push({ name: s.displayName.toLowerCase().trim(), icon: icon });
        }
      });
      setSkinList(fetchedSkins);

      const tiersRes = await fetch('https://valorant-api.com/v1/competitivetiers?language=pl-PL');
      const tiersData = await tiersRes.json();
      if (tiersData.data && tiersData.data.length > 0) {
        const latestTiers = tiersData.data[tiersData.data.length - 1].tiers;
        const validTiers = latestTiers.filter(t => t.tier >= 3);
        const fetchedRankIcons = validTiers.map(t => t.largeIcon || t.smallIcon);
        setRankIcons(fetchedRankIcons);
      }
    } catch (err) {}
  };

  const saveData = async () => {
    try {
      const state = { 
        creds, currentMapIndex, hp, clickDmg, agents, inventory, 
        equippedSkinId, rankIndex, missions, devRankMode,
        lastActiveTime: Date.now() 
      };
      await AsyncStorage.setItem('@valorant_tapper_v41', JSON.stringify(state)); 
    } catch (e) {}
  };

  const loadData = async () => {
    try {
      const saved = await AsyncStorage.getItem('@valorant_tapper_v41');
      if (saved) {
        const parsed = JSON.parse(saved);
        const loadedAgents = parsed.agents || DEFAULT_AGENTS;
        const loadedMapIdx = parsed.currentMapIndex || 0;
        const loadedHp = parsed.hp ?? MAPS_DATA[loadedMapIdx].hp;
        let currentInv = parsed.inventory || {};

        setCreds(parsed.creds || 0);
        setCurrentMapIndex(loadedMapIdx);
        setHp(loadedHp);
        setClickDmg(parsed.clickDmg || 5);
        setAgents(loadedAgents);
        setInventory(currentInv);
        setEquippedSkinId(parsed.equippedSkinId || null);
        setRankIndex(parsed.rankIndex || 0);
        setMissions(parsed.missions || generateMissionsForRank(0));
        setDevRankMode(parsed.devRankMode || false);

        const now = Date.now();
        const lastTime = parsed.lastActiveTime || now;
        const diffSec = Math.floor((now - lastTime) / 1000);

        if (diffSec > 60) { 
          const totalDps = loadedAgents.reduce((sum, a) => sum + (a.dps * a.level), 0);
          const offlineDps = totalDps * 0.01; 
          const offlineDmg = offlineDps * diffSec;

          if (offlineDmg > 0) {
            const map = MAPS_DATA[loadedMapIdx];
            let simHp = loadedHp;
            let dropsCount = 0;
            let remainingDmg = offlineDmg;

            if (remainingDmg >= simHp) {
              dropsCount++;
              remainingDmg -= simHp;
              dropsCount += Math.floor(remainingDmg / map.hp);
              remainingDmg = remainingDmg % map.hp;
              simHp = map.hp - remainingDmg;
            } else {
              simHp -= remainingDmg;
            }

            const maxSims = 200;
            const simLoops = Math.min(dropsCount, maxSims);
            const multiplier = dropsCount > maxSims ? Math.floor(dropsCount / maxSims) : 1;
            
            const reportDrops = {};
            const legendaries = map.skins.filter(s => s.rarity === 'legendary');
            const commons = map.skins.filter(s => s.rarity === 'common');

            for (let i = 0; i < simLoops; i++) {
              const isLegendary = Math.random() < 0.05;
              const pool = isLegendary && legendaries.length > 0 ? legendaries : commons;
              const dropped = pool[Math.floor(Math.random() * pool.length)];
              
              currentInv[dropped.id] = (currentInv[dropped.id] || 0) + multiplier;
              reportDrops[dropped.id] = (reportDrops[dropped.id] || 0) + multiplier;
            }

            const formattedDrops = Object.keys(reportDrops).map(id => {
              const skin = map.skins.find(s => s.id === id);
              return { skin, count: reportDrops[id] };
            });

            setInventory(currentInv);
            setHp(simHp);
            setCreds(prev => prev + offlineDmg);
            
            setOfflineReport({
              timeSec: diffSec,
              creds: offlineDmg,
              drops: formattedDrops
            });
          }
        }
      }
    } catch (e) {}
  };

  const getEquippedSkinInfo = () => {
    if (!equippedSkinId) return null;
    for (let mapIdx = 0; mapIdx < MAPS_DATA.length; mapIdx++) {
      const map = MAPS_DATA[mapIdx];
      const found = map.skins.find(s => s.id === equippedSkinId);
      if (found) return { skin: found, mapIdx, bonus: getSkinBonus(found, mapIdx) };
    }
    return null;
  };

  const equippedInfo = getEquippedSkinInfo();
  const equippedBonus = equippedInfo?.bonus || 0;

  const applyDamage = (amount) => {
    updateMissionProgress('damage', amount);
    setHp(prevHp => {
      const currentMapObj = MAPS_DATA[currentMapIndexRef.current] || MAPS_DATA[0];
      let newHp = prevHp - amount;
      if (newHp <= 0) {
        dropSkin(currentMapObj);
        return currentMapObj.hp;
      }
      return newHp;
    });
  };

  const handleChestTouch = (e) => {
    const fingerCount = e.nativeEvent.touches ? e.nativeEvent.touches.length : 1;
    const totalClickDmg = clickDmg + equippedBonus;
    const totalDamage = totalClickDmg * Math.max(1, fingerCount);

    updateMissionProgress('tap', Math.max(1, fingerCount));
    triggerShotAnimation(totalDamage);
    applyDamage(totalDamage);
  };

  const dropSkin = (map) => {
    const legendaries = map.skins.filter(s => s.rarity === 'legendary');
    const commons = map.skins.filter(s => s.rarity === 'common');
    
    const isLegendary = Math.random() < 0.05;
    const pool = isLegendary && legendaries.length > 0 ? legendaries : commons;
    const dropped = pool[Math.floor(Math.random() * pool.length)];

    if (!dropped) return;

    setInventory(prev => ({ ...prev, [dropped.id]: (prev[dropped.id] || 0) + 1 }));
    setLastDroppedSkin(dropped);

    if (dropped.rarity === 'legendary') {
      triggerKnifeAnimation(dropped);
    } else {
      showCustomDropAlert(dropped, map);
    }
  };

  const handleSellSkinModal = () => {
    if (!inspectSkinModal) return;
    const { skin, mapIdx } = inspectSkinModal;
    const currentCount = inventory[skin.id] || 0;

    if (currentCount > 0) {
      const baseVal = skin.rarity === 'legendary' ? 1000 : 100;
      const sellVal = Math.floor(baseVal * Math.pow(2.5, mapIdx));
      
      setCreds(c => c + sellVal);
      updateMissionProgress('sell', 1);

      if (equippedSkinId === skin.id && currentCount === 1) {
        setEquippedSkinId(null);
      }

      setInventory(prev => ({ ...prev, [skin.id]: currentCount - 1 }));

      if (currentCount - 1 === 0) {
        setInspectSkinModal(null);
      }
    }
  };

  const buyAgent = (agentId) => {
    setAgents(prevAgents => prevAgents.map(ag => {
      if (ag.id === agentId) {
        if (ag.level >= 4) {
          Alert.alert('Max poziom', 'Tego agenta można ulepszyć maksymalnie 4 razy!');
          return ag;
        }
        const cost = ag.basePrice * Math.pow(2.5, ag.level);
        if (creds >= cost) {
          setCreds(c => c - cost);
          return { ...ag, level: ag.level + 1 };
        } else {
          Alert.alert('Brak Creds', `Potrzebujesz ${Math.round(cost).toLocaleString()} ₡!`);
        }
      }
      return ag;
    }));
  };

  const handleRedeemCode = () => {
    const code = redeemCode.trim();
    if (code === 'testapkiK4mil') {
      setCreds(prev => prev + 999999999999999);
      setRedeemCode('');
      Alert.alert('👨‍‍💻 Kod Deweloperski', 'Aktywowano kod! Dodano gigantyczną ilość Creds do testów.');
    } else if (code === 'radiantmain') {
      setDevRankMode(true);
      setRedeemCode('');
      Alert.alert('👨‍💻 Tryb Radiant', 'Aktywowano! Przycisk awansu rangi będzie od teraz zawsze aktywny (omija misje).');
    } else {
      Alert.alert('Błąd', 'Nieprawidłowy kod promocyjny.');
    }
  };

  const hardResetGame = async () => {
    Alert.alert(
      "UWAGA",
      "Czy na pewno chcesz zresetować cały postęp gry? To naprawi wszelkie błędy.",
      [
        { text: "Anuluj", style: "cancel" },
        { 
          text: "Zresetuj Postęp", 
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.clear();
            setCreds(0);
            setCurrentMapIndex(0);
            setHp(MAPS_DATA[0].hp);
            setAgents(DEFAULT_AGENTS);
            setInventory({});
            setEquippedSkinId(null);
            setLastDroppedSkin(null);
            setRankIndex(0);
            setMissions(generateMissionsForRank(0));
            setDevRankMode(false);
            setOfflineReport(null);
            Alert.alert("Zresetowano", "Pamięć wyczyszczona. Uruchom grę ponownie (lub wciśnij klawisz 'r' w konsoli).");
            setIsSettingsOpen(false);
          }
        }
      ]
    );
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const getUnlockedCountForMap = (map) => {
    return map.skins.filter(s => (inventory[s.id] || 0) > 0).length;
  };

  const getSkinIconUrl = (skin) => {
    if (!skin || skinList.length === 0) return null;
    let found = skinList.find(s => s.name === skin.searchKey.toLowerCase());
    if (!found) found = skinList.find(s => s.name.includes(skin.searchKey.toLowerCase()));
    if (!found) {
      const searchWords = skin.searchKey.toLowerCase().split(' ');
      found = skinList.find(s => searchWords.every(word => s.name.includes(word)));
    }
    return found ? found.icon : null;
  };

  const currentMapRenderObj = MAPS_DATA[currentMapIndex] || MAPS_DATA[0];
  const currentMapIconUrl = mapIcons[currentMapRenderObj.name.toLowerCase()];

  const inspectSkinObj = inspectSkinModal?.skin;
  const inspectMapIdx = inspectSkinModal?.mapIdx;
  const inspectCount = inspectSkinObj ? (inventory[inspectSkinObj.id] || 0) : 0;
  const inspectIsEquipped = inspectSkinObj ? equippedSkinId === inspectSkinObj.id : false;
  const inspectSellVal = inspectSkinModal ? Math.floor((inspectSkinObj.rarity === 'legendary' ? 1000 : 100) * Math.pow(2.5, inspectMapIdx)) : 0;

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      {activeAbilities.map(ab => <AbilityFloat key={ab.id} ability={ab} />)}

      <Animated.View style={[styles.customDropAlert, { transform: [{ translateY: dropAlertAnim }] }]}>
        {currentDrop && (
          <View style={styles.customDropContent}>
            <SkinImage skinName={currentDrop.skin.name} iconUrl={getSkinIconUrl(currentDrop.skin)} style={styles.customDropIcon} />
            <View style={styles.customDropTextCol}>
              <Text style={styles.customDropTitle}>🎁 NOWY SKIN!</Text>
              <Text style={[styles.customDropName, currentDrop.skin.rarity === 'legendary' && styles.goldText]} numberOfLines={1}>
                {currentDrop.skin.name}
              </Text>
              <Text style={styles.customDropMap}>Mapa: {currentDrop.mapName}</Text>
            </View>
          </View>
        )}
      </Animated.View>

      <View style={styles.header}>
        <View style={{ width: 30 }} />
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.mapTitle}>MAPA: {currentMapRenderObj.name.toUpperCase()}</Text>
          <Text style={styles.creds}>Creds: {creds.toLocaleString()} ₡</Text>
        </View>
        <TouchableOpacity style={styles.settingsBtn} onPress={() => setIsSettingsOpen(true)}>
          <Text style={styles.settingsBtnText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={!!offlineReport} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: '80%' }]}>
            <Text style={styles.modalTitle}>WITAJ PONOWNIE!</Text>
            
            {offlineReport && (
              <>
                <Text style={styles.offlineText}>Czas nieobecności: <Text style={styles.goldText}>{formatTime(offlineReport.timeSec)}</Text></Text>
                <Text style={styles.offlineText}>Zarobiono 1% DPS: <Text style={styles.goldText}>{offlineReport.creds.toLocaleString()} ₡</Text></Text>
                
                <Text style={[styles.tabHeading, { marginTop: 15, fontSize: 14 }]}>ZDOBYTE SKINY:</Text>
                <ScrollView style={{ marginTop: 10, marginBottom: 15, paddingHorizontal: 5 }}>
                  {offlineReport.drops.length === 0 ? (
                     <Text style={{color: '#8b9b9e', textAlign: 'center'}}>Brak nowych dropów.</Text>
                  ) : (
                    offlineReport.drops.map((d, i) => (
                      <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <Text style={[styles.skinName, d.skin.rarity === 'legendary' && styles.goldText]}>
                          {d.skin.name}
                        </Text>
                        <Text style={styles.skinCount}>x{d.count}</Text>
                      </View>
                    ))
                  )}
                </ScrollView>
              </>
            )}

            <TouchableOpacity style={styles.closeInspectBtn} onPress={() => setOfflineReport(null)}>
              <Text style={styles.closeInspectBtnText}>ZBIERZ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={!!knifeModalSkin} transparent={true} animationType="fade">
        <View style={styles.knifeModalOverlay}>
          <View style={styles.goldGlowBg} />
          <Animated.View style={[styles.knifeModalCard, { transform: [{ scale: knifeScaleAnim }] }]}>
            <Text style={styles.knifeModalTitle}>★ LEGENDARNY DROP NÓŻ ★</Text>
            <Text style={styles.knifeRaritySub}>5% CHANCE SECRET DROP</Text>

            {knifeModalSkin && (
              <View style={styles.knifePreviewBox}>
                <SkinImage skinName={knifeModalSkin.name} iconUrl={getSkinIconUrl(knifeModalSkin)} style={styles.knifeLargeIcon} />
                <Text style={styles.knifeNameText}>{knifeModalSkin.name}</Text>
              </View>
            )}

            <TouchableOpacity style={styles.collectKnifeBtn} onPress={() => setKnifeModalSkin(null)}>
              <Text style={styles.collectKnifeBtnText}>ODBIERZ NÓŻ</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      <Modal visible={!!inspectSkinModal} transparent={true} animationType="fade">
        <View style={styles.knifeModalOverlay}>
          <TouchableOpacity style={styles.closeInspectBg} onPress={() => setInspectSkinModal(null)} />
          <Animated.View style={[styles.inspectModalCard, { transform: [{ scale: inspectScaleAnim }] }]}>
            {inspectSkinObj && (
              <>
                <Text style={[styles.inspectTitle, inspectSkinObj.rarity === 'legendary' && styles.goldText]}>
                  {inspectSkinObj.name} {inspectSkinObj.rarity === 'legendary' ? '★' : ''}
                </Text>
                
                <View style={styles.inspectPreviewBox}>
                  <SkinImage skinName={inspectSkinObj.name} iconUrl={getSkinIconUrl(inspectSkinObj)} style={styles.inspectLargeIcon} />
                </View>

                <View style={styles.inspectInfoRow}>
                  <Text style={styles.inspectInfoText}>Posiadasz: <Text style={styles.inspectInfoBold}>{inspectCount}</Text></Text>
                  <Text style={styles.inspectInfoText}>Rzadkość: <Text style={styles.inspectInfoBold}>{inspectSkinObj.rarity === 'legendary' ? 'Legendarna' : 'Zwykła'}</Text></Text>
                </View>

                <View style={styles.inspectActionRow}>
                  <TouchableOpacity style={styles.inspectSellBtn} onPress={handleSellSkinModal}>
                    <Text style={styles.inspectBtnText}>SPRZEDAJ{'\n'}(+{inspectSellVal.toLocaleString()} ₡)</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.inspectEquipBtn, inspectIsEquipped && styles.equippedActiveBtn]} 
                    onPress={() => setEquippedSkinId(inspectIsEquipped ? null : inspectSkinObj.id)}
                  >
                    <Text style={styles.inspectBtnText}>{inspectIsEquipped ? 'ZDEJMIJ' : 'WYPOSAŻ'}</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.closeInspectBtn} onPress={() => setInspectSkinModal(null)}>
                  <Text style={styles.closeInspectBtnText}>ZAMKNIJ POWIĘKSZENIE</Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
        </View>
      </Modal>

      {/* NOWY MODAL: PORADNIK GRACZA */}
      <Modal visible={isGuideOpen} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: '85%', paddingHorizontal: 15 }]}>
            <Text style={styles.modalTitle}>📖 PORADNIK GRACZA</Text>
            
            <ScrollView style={{ marginTop: 10, marginBottom: 20 }}>
              <Text style={styles.guideSectionTitle}>1. Podstawy Walki</Text>
              <Text style={styles.guideText}>Tapuj (klikaj) w skrzynię na środku ekranu, aby zadawać obrażenia. Gdy HP skrzyni spadnie do zera, otrzymasz losowego skina z obecnej mapy!</Text>
              
              <Text style={styles.guideSectionTitle}>2. Ekwipunek i Sprzedaż</Text>
              <Text style={styles.guideText}>Wszystkie zdobyte skiny trafiają do Ekwipunku. Możesz tam je WYPOSAŻYĆ (zwiększa siłę Twojego kliknięcia) lub SPRZEDAĆ, aby zyskać Creds. Im wyższa mapa i rzadszy skin, tym potężniejszy buff do DMG i cena sprzedaży.</Text>

              <Text style={styles.guideSectionTitle}>3. Odblokowywanie Map</Text>
              <Text style={styles.guideText}>Aby odblokować nową mapę w zakładce "Mapy", musisz zdobyć przynajmniej 8 z 10 unikalnych skinów z obecnej mapy. UWAGA: Jeśli sprzedasz skina i spadniesz poniżej 8 posiadanych wzorów, gra nałoży na Ciebie karę i cofnie Cię na pierwszą mapę (Ascent)!</Text>

              <Text style={styles.guideSectionTitle}>4. Rekrutacja Agentów</Text>
              <Text style={styles.guideText}>Kupuj i ulepszaj Agentów za Creds w zakładce "Sklep". Każdy z nich automatycznie atakuje skrzynię w tle (DPS). Agenci mogą mieć max 4 poziom. Jeśli wymaxujesz Agenta, co kilka sekund użyje swojej unikalnej umiejętności, zadając gigantyczne, jednorazowe obrażenia.</Text>

              <Text style={styles.guideSectionTitle}>5. System Rang (Iron - Radiant)</Text>
              <Text style={styles.guideText}>W zakładce "Ranga" znajdziesz misje. Ukończenie trzech misji daje nagrody i pozwala Ci awansować wyżej. Wyższa ranga to trudniejsze misje, ale też większe nagrody!</Text>

              <Text style={styles.guideSectionTitle}>6. Zarobki Offline</Text>
              <Text style={styles.guideText}>Nawet gdy wyłączysz grę na dłużej niż minutę, Twoi ulepszeni Agenci ciągle pracują. Po powrocie otrzymasz 1% całego zysku, jaki by wypracowali, łącznie z losowymi dropami ze skrzynek!</Text>
            </ScrollView>

            <TouchableOpacity style={styles.closeModalBtn} onPress={() => setIsGuideOpen(false)}>
              <Text style={styles.closeModalBtnText}>ZROZUMIAŁEM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL USTAWIEŃ */}
      <Modal visible={isSettingsOpen} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>⚙️ USTAWIENIA GRY</Text>

            <View style={styles.redeemSection}>
              <Text style={styles.settingLabel}>Kod promocyjny:</Text>
              <TextInput 
                style={styles.redeemInput} 
                placeholder="Wpisz kod..."
                placeholderTextColor="#666"
                value={redeemCode}
                onChangeText={setRedeemCode}
                autoCapitalize="none"
              />
              <TouchableOpacity style={styles.redeemSubmitBtn} onPress={handleRedeemCode}>
                <Text style={styles.redeemSubmitBtnText}>Użyj kodu</Text>
              </TouchableOpacity>
            </View>

            {/* PRZYCISK PORADNIKA */}
            <TouchableOpacity style={styles.guideBtn} onPress={() => { setIsSettingsOpen(false); setIsGuideOpen(true); }}>
              <Text style={styles.guideBtnText}>📖 OTWÓRZ PORADNIK GRY</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetBtn} onPress={hardResetGame}>
              <Text style={styles.resetBtnText}>RESETUJ ZAPIS GRY</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeModalBtn} onPress={() => setIsSettingsOpen(false)}>
              <Text style={styles.closeModalBtnText}>Zamknij</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {activeTab === 'game' && (
        <View style={styles.gameView}>
          {equippedInfo && (
            <View style={styles.equippedBadge}>
              <Text style={styles.equippedBadgeText}>
                🎯 Wyposażono: <Text style={{ color: '#00f0ff' }}>{equippedInfo.skin.name}</Text> (+{equippedBonus.toLocaleString()} DMG)
              </Text>
            </View>
          )}

          <View style={styles.chestContainer}>
            <Animated.View style={[styles.flashOverlay, { opacity: flashAnim }]} pointerEvents="none" />
            
            {floatingText && (
              <Animated.Text 
                style={[
                  styles.floatingDmgText, 
                  { 
                    opacity: floatAnim.interpolate({ inputRange: [0, 0.8, 1], outputRange: [1, 1, 0] }),
                    transform: [{ translateY: floatAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -45] }) }]
                  }
                ]}
              >
                {floatingText}
              </Animated.Text>
            )}

            <View 
              onTouchStart={handleChestTouch}
              style={{ borderRadius: 32, overflow: 'hidden' }}
            >
              <Animated.View style={[styles.chestBtn, { transform: [{ scale: shotAnim }] }]}>
                {currentMapIconUrl ? (
                  <Image source={{ uri: currentMapIconUrl }} style={styles.mapBtnLogo} resizeMode="cover" />
                ) : null}
                <View style={styles.chestOverlay}>
                  <Text style={styles.chestText}>SKRZYNIA</Text>
                  <Text style={styles.chestSub}>{currentMapRenderObj.name}</Text>
                </View>
              </Animated.View>
            </View>
          </View>

          <View style={styles.hpBox}>
            <View style={[styles.hpBar, { width: `${Math.max(0, (hp / currentMapRenderObj.hp) * 100)}%` }]} />
          </View>
          <Text style={styles.hpText}>HP: {hp.toLocaleString()} / {currentMapRenderObj.hp.toLocaleString()}</Text>

          {lastDroppedSkin && (
            <View style={styles.lastDropBox}>
              <Text style={styles.lastDropLabel}>Ostatnio wypadł:</Text>
              <View style={styles.lastDropRow}>
                <SkinImage skinName={lastDroppedSkin.name} iconUrl={getSkinIconUrl(lastDroppedSkin)} style={styles.skinDropIcon} />
                <Text style={[styles.lastDropName, lastDroppedSkin.rarity === 'legendary' && styles.goldText]}>
                  {lastDroppedSkin.name}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}

      {activeTab === 'rank' && (
        <ScrollView style={styles.tabContent} contentContainerStyle={styles.scrollContent}>
          <View style={styles.rankHeader}>
            <Text style={styles.rankTitle}>TWOJA RANGA</Text>
            <View style={styles.rankNameRow}>
              {rankIcons[rankIndex] && (
                <Image source={{ uri: rankIcons[rankIndex] }} style={styles.rankIconLarge} resizeMode="contain" />
              )}
              <Text style={[styles.rankNameText, rankIndex === RANKS.length - 1 && styles.radiantText]}>
                {RANKS[rankIndex]}
              </Text>
            </View>
          </View>

          <Text style={styles.tabHeading}>MISJE DO AWANSU</Text>
          {missions.map(m => (
            <View key={m.id} style={styles.card}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.missionDesc}>{m.desc}</Text>
                <View style={styles.missionProgressBox}>
                  <View style={[styles.missionProgressBar, { width: `${Math.min(100, (m.progress / m.target) * 100)}%` }]} />
                </View>
                <Text style={styles.missionProgressText}>
                  {m.progress.toLocaleString()} / {m.target.toLocaleString()}
                </Text>
              </View>
              <TouchableOpacity 
                style={[styles.buyBtn, (!m.claimed && m.progress >= m.target) ? styles.claimBtnReady : styles.disabledBtn]} 
                disabled={m.claimed || m.progress < m.target}
                onPress={() => claimMission(m.id)}
              >
                <Text style={styles.buyBtnText}>
                  {m.claimed ? 'ODEBRANO' : `ODBIERZ\n+${m.reward.toLocaleString()} ₡`}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
          
          {(devRankMode || missions.every(m => m.claimed)) && rankIndex < RANKS.length - 1 && (
            <TouchableOpacity style={styles.rankUpBtn} onPress={handleRankUp}>
              <Text style={styles.rankUpBtnText}>AWANSUJ NA {RANKS[rankIndex + 1].toUpperCase()}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}

      {activeTab === 'shop' && (
        <ScrollView style={styles.tabContent} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.tabHeading}>REKRUTACJA AGENTÓW</Text>
          {agents.map(ag => {
            const cost = Math.round(ag.basePrice * Math.pow(2.5, ag.level));
            const iconUrl = agentIcons[ag.id.toLowerCase().replace(' 👑', '')];
            const abilities = agentAbilities[ag.id.toLowerCase().replace(' 👑', '')] || [];

            return (
              <View key={ag.id} style={styles.card}>
                <View style={styles.agentRow}>
                  <View style={{ position: 'relative' }}>
                    {iconUrl ? (
                      <Image source={{ uri: iconUrl }} style={styles.agentIcon} />
                    ) : (
                      <View style={styles.agentIconPlaceholder} />
                    )}
                    
                    {ag.level >= 1 && abilities[0] && <Image source={{ uri: abilities[0] }} style={[styles.abilityBadgeIcon, { bottom: -4, right: -4 }]} />}
                    {ag.level >= 2 && abilities[1] && <Image source={{ uri: abilities[1] }} style={[styles.abilityBadgeIcon, { top: -4, right: -4 }]} />}
                    {ag.level >= 3 && abilities[2] && <Image source={{ uri: abilities[2] }} style={[styles.abilityBadgeIcon, { top: -4, left: -4 }]} />}
                    {ag.level >= 4 && abilities[3] && <Image source={{ uri: abilities[3] }} style={[styles.abilityBadgeIcon, { bottom: -4, left: -4 }]} />}
                  </View>
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={[styles.cardTitle, ag.id === 'omen' && styles.goldText]}>{ag.name}</Text>
                    <Text style={styles.cardSub}>Poz: {ag.level}/4 | DPS: +{(ag.dps * ag.level).toLocaleString()}/s</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={[styles.buyBtn, ag.level >= 4 && styles.disabledBtn]} 
                  onPress={() => buyAgent(ag.id)}
                  disabled={ag.level >= 4}
                >
                  <Text style={styles.buyBtnText}>{ag.level >= 4 ? 'MAX POZIOM' : `Ulepsz\n(${cost.toLocaleString()} ₡)`}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      )}

      {activeTab === 'inventory' && (
        <ScrollView style={styles.tabContent} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.tabHeading}>TWÓJ EKWIPUNEK SKINÓW</Text>
          {MAPS_DATA.map((map, mapIdx) => {
            const unlocked = getUnlockedCountForMap(map);
            return (
              <View key={map.id} style={styles.mapSection}>
                <Text style={styles.mapSectionHeader}>{map.name} ({unlocked}/10 skinów)</Text>
                {map.skins.map(skin => {
                  const count = inventory[skin.id] || 0;
                  const skinIconUrl = getSkinIconUrl(skin);
                  const isEquipped = equippedSkinId === skin.id;
                  const skinBonus = getSkinBonus(skin, mapIdx);

                  return (
                    <View key={skin.id} style={[styles.skinItem, count === 0 && styles.lockedSkin]}>
                      <TouchableOpacity 
                        style={styles.skinLeftRow} 
                        disabled={count === 0}
                        onPress={() => triggerInspectAnimation(skin, mapIdx)}
                      >
                        <SkinImage skinName={skin.name} iconUrl={skinIconUrl} style={styles.skinListIcon} />
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.skinName, skin.rarity === 'legendary' && styles.goldText]}>
                            {skin.name} {skin.rarity === 'legendary' ? '★' : ''}
                          </Text>
                          <Text style={styles.skinBonusSub}>+{skinBonus.toLocaleString()} Klik DMG</Text>
                        </View>
                      </TouchableOpacity>

                      <View style={styles.actionBlock}>
                        <Text style={styles.skinCount}>x{count}</Text>
                        {isEquipped && <Text style={styles.equippedTextSmall}>[WYPOSAŻONO]</Text>}
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      )}

      {activeTab === 'maps' && (
        <ScrollView style={styles.tabContent} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.tabHeading}>WYBÓR MAPY</Text>
          {MAPS_DATA.map((map, idx) => {
            const unlockedCount = getUnlockedCountForMap(map);
            const isCurrent = currentMapIndex === idx;
            const canAccess = idx === 0 || getUnlockedCountForMap(MAPS_DATA[idx - 1]) >= 8;
            const mIcon = mapIcons[map.name.toLowerCase()];

            return (
              <View key={map.id} style={[styles.card, isCurrent && styles.activeMapCard]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  {mIcon && <Image source={{ uri: mIcon }} style={styles.mapCardIcon} resizeMode="cover" />}
                  <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={styles.cardTitle}>{map.name}</Text>
                    <Text style={styles.cardSub}>HP: {map.hp.toLocaleString()} | Skiny: {unlockedCount}/10</Text>
                  </View>
                </View>

                {canAccess ? (
                  <TouchableOpacity 
                    style={[styles.buyBtn, isCurrent && styles.disabledBtn]} 
                    disabled={isCurrent}
                    onPress={() => { setCurrentMapIndex(idx); setHp(map.hp); }}
                  >
                    <Text style={styles.buyBtnText}>{isCurrent ? 'Aktywna' : 'Wybierz'}</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.lockText}>Wymaga 8/10 z poprzedniej</Text>
                )}
              </View>
            );
          })}
        </ScrollView>
      )}

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navBtn} onPress={() => setActiveTab('game')}>
          <Text style={[styles.navText, activeTab === 'game' && styles.activeNavText]}>Gra</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => setActiveTab('rank')}>
          <Text style={[styles.navText, activeTab === 'rank' && styles.activeNavText]}>Ranga</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => setActiveTab('shop')}>
          <Text style={[styles.navText, activeTab === 'shop' && styles.activeNavText]}>Sklep</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => setActiveTab('inventory')}>
          <Text style={[styles.navText, activeTab === 'inventory' && styles.activeNavText]}>Ekwipunek</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => setActiveTab('maps')}>
          <Text style={[styles.navText, activeTab === 'maps' && styles.activeNavText]}>Mapy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f1923', paddingTop: 30, paddingBottom: 15 },
  header: { paddingVertical: 10, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ff4655' },
  mapTitle: { color: '#00f0ff', fontSize: 13, fontWeight: 'bold' },
  creds: { color: '#ff4655', fontSize: 18, fontWeight: 'bold', marginTop: 2 },
  settingsBtn: { padding: 6, backgroundColor: '#1f2326', borderRadius: 8, borderWidth: 1, borderColor: '#333' },
  settingsBtnText: { fontSize: 16 },

  abilityFloatContainer: { position: 'absolute', right: 10, top: '40%', zIndex: 50, backgroundColor: 'rgba(23, 29, 36, 0.9)', padding: 10, borderRadius: 12, borderWidth: 1, borderColor: '#00f0ff', flexDirection: 'row', alignItems: 'center' },
  abilityFloatIcon: { width: 35, height: 35, marginRight: 10, borderRadius: 5, backgroundColor: '#0f1923' },
  abilityFloatAgent: { color: '#00f0ff', fontSize: 12, fontWeight: 'bold' },
  abilityFloatDmg: { color: '#ff4655', fontSize: 14, fontWeight: 'bold' },

  customDropAlert: { position: 'absolute', top: 45, left: '5%', right: '5%', zIndex: 9999, backgroundColor: '#171d24', borderRadius: 12, padding: 12, borderWidth: 2, borderColor: '#00f0ff', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 5, elevation: 10 },
  customDropContent: { flexDirection: 'row', alignItems: 'center' },
  customDropIcon: { width: 60, height: 30, marginRight: 12 },
  customDropTextCol: { flex: 1 },
  customDropTitle: { color: '#ffd700', fontSize: 10, fontWeight: 'bold', marginBottom: 2 },
  customDropName: { color: '#ece8e1', fontSize: 13, fontWeight: 'bold' },
  customDropMap: { color: '#8b9b9e', fontSize: 10, marginTop: 2 },

  knifeModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.92)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  goldGlowBg: { position: 'absolute', width: 280, height: 280, borderRadius: 140, backgroundColor: '#ffd700', opacity: 0.15 },
  knifeModalCard: { width: '100%', maxWidth: 350, backgroundColor: '#171d24', borderRadius: 20, padding: 25, alignItems: 'center', borderWidth: 2, borderColor: '#ffd700' },
  knifeModalTitle: { color: '#ffd700', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  knifeRaritySub: { color: '#ff4655', fontSize: 11, fontWeight: 'bold', marginTop: 4, letterSpacing: 1 },
  knifePreviewBox: { marginVertical: 20, alignItems: 'center' },
  knifeLargeIcon: { width: 160, height: 80 },
  knifeNameText: { color: '#ece8e1', fontSize: 16, fontWeight: 'bold', marginTop: 10, textAlign: 'center' },
  collectKnifeBtn: { backgroundColor: '#ffd700', paddingHorizontal: 25, paddingVertical: 10, borderRadius: 10 },
  collectKnifeBtnText: { color: '#0f1923', fontWeight: 'bold', fontSize: 14 },

  closeInspectBg: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
  inspectModalCard: { width: '90%', maxWidth: 360, backgroundColor: '#171d24', borderRadius: 16, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#00f0ff' },
  inspectTitle: { color: '#ece8e1', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  inspectPreviewBox: { width: '100%', height: 120, backgroundColor: '#1f2326', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#333' },
  inspectLargeIcon: { width: 220, height: 100 },
  inspectInfoRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  inspectInfoText: { color: '#8b9b9e', fontSize: 14 },
  inspectInfoBold: { color: '#ece8e1', fontWeight: 'bold' },
  inspectActionRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  inspectSellBtn: { flex: 1, backgroundColor: '#800000', padding: 12, borderRadius: 8, marginRight: 5, borderWidth: 1, borderColor: '#ff4655', alignItems: 'center', justifyContent: 'center' },
  inspectEquipBtn: { flex: 1, backgroundColor: '#2b3945', padding: 12, borderRadius: 8, marginLeft: 5, borderWidth: 1, borderColor: '#00f0ff', alignItems: 'center', justifyContent: 'center' },
  inspectBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13, textAlign: 'center' },
  closeInspectBtn: { backgroundColor: '#1f2326', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 8, borderWidth: 1, borderColor: '#4a4a4a', width: '100%' },
  closeInspectBtnText: { color: '#ece8e1', fontWeight: 'bold', fontSize: 13, textAlign: 'center' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', maxWidth: 380, backgroundColor: '#171d24', borderRadius: 16, padding: 20, borderWidth: 2, borderColor: '#ff4655' },
  modalTitle: { color: '#ece8e1', fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  
  // Poradnik Styles
  guideSectionTitle: { color: '#00f0ff', fontSize: 14, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
  guideText: { color: '#8b9b9e', fontSize: 13, lineHeight: 18 },
  guideBtn: { backgroundColor: '#2b3945', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#00f0ff' },
  guideBtnText: { color: '#ece8e1', fontWeight: 'bold', fontSize: 13 },

  offlineText: { color: '#ece8e1', fontSize: 14, marginBottom: 8, textAlign: 'center' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  settingLabel: { color: '#ece8e1', fontSize: 13, fontWeight: 'bold' },
  redeemSection: { marginTop: 5, marginBottom: 15 },
  redeemInput: { backgroundColor: '#0f1923', borderWidth: 1, borderColor: '#00f0ff', borderRadius: 8, padding: 8, color: '#fff', marginBottom: 8, fontSize: 13 },
  redeemSubmitBtn: { backgroundColor: '#ff4655', padding: 8, borderRadius: 8, alignItems: 'center' },
  redeemSubmitBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  resetBtn: { backgroundColor: '#800000', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#ff4655' },
  resetBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  closeModalBtn: { backgroundColor: '#1f2326', padding: 8, borderRadius: 8, alignItems: 'center' },
  closeModalBtnText: { color: '#ece8e1', fontWeight: 'bold', fontSize: 13 },

  gameView: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 },
  equippedBadge: { backgroundColor: '#171d24', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10, borderWidth: 1, borderColor: '#00f0ff', marginBottom: 8 },
  equippedBadgeText: { color: '#ece8e1', fontSize: 11, fontWeight: 'bold' },
  chestContainer: { alignItems: 'center', justifyContent: 'center', position: 'relative', marginVertical: 8 },
  flashOverlay: { position: 'absolute', width: 210, height: 210, borderRadius: 32, backgroundColor: '#00f0ff', zIndex: 2 },
  floatingDmgText: { position: 'absolute', top: -25, color: '#ff4655', fontSize: 24, fontWeight: 'bold', zIndex: 10 },
  chestBtn: { width: 190, height: 190, borderRadius: 32, overflow: 'hidden', borderWidth: 4, borderColor: '#ff4655', justifyContent: 'center', alignItems: 'center', backgroundColor: '#171d24' },
  mapBtnLogo: { position: 'absolute', width: '100%', height: '100%', opacity: 0.55 },
  chestOverlay: { alignItems: 'center', backgroundColor: 'rgba(15, 25, 35, 0.65)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  chestText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  chestSub: { color: '#00f0ff', fontSize: 11, marginTop: 2, fontWeight: 'bold' },
  hpBox: { width: '70%', maxWidth: 280, height: 12, backgroundColor: '#1f2326', borderRadius: 6, marginTop: 12, overflow: 'hidden' },
  hpBar: { height: '100%', backgroundColor: '#00f0ff' },
  hpText: { color: '#ece8e1', fontSize: 13, marginTop: 5, fontWeight: 'bold' },
  lastDropBox: { marginTop: 10, alignItems: 'center' },
  lastDropLabel: { color: '#8b9b9e', fontSize: 10 },
  lastDropRow: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  skinDropIcon: { width: 40, height: 20, marginRight: 6 },
  lastDropName: { color: '#ece8e1', fontSize: 14, fontWeight: 'bold' },

  tabContent: { flex: 1 },
  scrollContent: { padding: 15, paddingBottom: 30 },
  tabHeading: { color: '#ece8e1', fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  card: { backgroundColor: '#1f2326', borderRadius: 12, padding: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  agentRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  agentIcon: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: '#ff4655' },
  abilityBadgeIcon: { position: 'absolute', width: 20, height: 20, borderRadius: 10, backgroundColor: '#0f1923', borderWidth: 1, borderColor: '#00f0ff' },
  agentIconPlaceholder: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#2a3540' },
  cardTitle: { color: '#ece8e1', fontSize: 15, fontWeight: 'bold' },
  cardSub: { color: '#8b9b9e', fontSize: 11, marginTop: 2 },
  goldText: { color: '#ffd700', fontWeight: 'bold' },
  buyBtn: { backgroundColor: '#ff4655', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, alignItems: 'center' },
  buyBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 11, textAlign: 'center' },
  disabledBtn: { backgroundColor: '#4a4a4a' },
  claimBtnReady: { backgroundColor: '#00f0ff' },

  rankHeader: { alignItems: 'center', marginBottom: 20, padding: 15, backgroundColor: '#1f2326', borderRadius: 12, borderWidth: 2, borderColor: '#ffd700' },
  rankTitle: { color: '#8b9b9e', fontSize: 12, fontWeight: 'bold', marginBottom: 5 },
  rankNameRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  rankIconLarge: { width: 50, height: 50, marginRight: 15 },
  rankNameText: { color: '#ece8e1', fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase' },
  radiantText: { color: '#00f0ff', textShadowColor: '#00f0ff', textShadowRadius: 10 },
  missionDesc: { color: '#ece8e1', fontSize: 14, fontWeight: 'bold', marginBottom: 6 },
  missionProgressBox: { width: '100%', height: 8, backgroundColor: '#2b3945', borderRadius: 4, overflow: 'hidden', marginBottom: 4 },
  missionProgressBar: { height: '100%', backgroundColor: '#ffd700' },
  missionProgressText: { color: '#8b9b9e', fontSize: 11 },
  rankUpBtn: { backgroundColor: '#ffd700', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  rankUpBtnText: { color: '#0f1923', fontWeight: 'bold', fontSize: 16 },

  mapSection: { marginBottom: 15 },
  mapSectionHeader: { color: '#00f0ff', fontSize: 14, fontWeight: 'bold', marginBottom: 6 },
  skinItem: { backgroundColor: '#1f2326', padding: 8, borderRadius: 6, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  skinLeftRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  skinListIcon: { width: 40, height: 20, marginRight: 8 },
  skinIconFallback: { width: 40, height: 20, backgroundColor: '#2b3945', borderRadius: 4, marginRight: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#00f0ff' },
  fallbackText: { color: '#00f0ff', fontSize: 8, fontWeight: 'bold' },
  lockedSkin: { opacity: 0.35 },
  skinName: { color: '#ece8e1', fontWeight: '500', fontSize: 12 },
  skinBonusSub: { color: '#00f0ff', fontSize: 9, marginTop: 1 },
  actionBlock: { flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' },
  skinCount: { color: '#ff4655', fontWeight: 'bold', fontSize: 14 },
  equippedTextSmall: { color: '#00f0ff', fontSize: 8, fontWeight: 'bold', marginTop: 2 },
  equippedActiveBtn: { backgroundColor: '#00f0ff', borderColor: '#00f0ff' },

  lockText: { color: '#ff4655', fontSize: 10, maxWidth: 90, textAlign: 'right' },
  mapCardIcon: { width: 45, height: 30, borderRadius: 6 },
  activeMapCard: { borderColor: '#00f0ff', borderWidth: 2 },

  bottomNav: { flexDirection: 'row', backgroundColor: '#171d24', borderTopWidth: 1, borderTopColor: '#2c353f' },
  navBtn: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  navText: { color: '#8b9b9e', fontSize: 11, fontWeight: 'bold' },
  activeNavText: { color: '#ff4655' }
});