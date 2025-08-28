import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

// Define icon library types
type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
type FontAwesomeIconName = ComponentProps<typeof FontAwesome>['name'];
type IoniconsIconName = ComponentProps<typeof Ionicons>['name'];
type AntDesignIconName = ComponentProps<typeof AntDesign>['name'];
type FeatherIconName = ComponentProps<typeof Feather>['name'];

// Icon mapping with library specification
type IconLibrary = 'MaterialIcons' | 'FontAwesome' | 'Ionicons' | 'AntDesign' | 'Feather';

type IconConfig = {
  library: IconLibrary;
  name: MaterialIconName | FontAwesomeIconName | IoniconsIconName | AntDesignIconName | FeatherIconName;
};

type IconMapping = Record<SymbolViewProps['name'], IconConfig>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to various icon library mappings here.
 * You can now use icons from multiple libraries:
 * - MaterialIcons: see [Icons Directory](https://icons.expo.fyi)
 * - FontAwesome: see [FontAwesome Icons](https://fontawesome.com/icons)
 * - Ionicons: see [Ionicons](https://ionic.io/ionicons)
 * - AntDesign: see [Ant Design Icons](https://ant.design/components/icon)
 * - Feather: see [Feather Icons](https://feathericons.com)
 */
const MAPPING = {
  // Material Icons
  'house.fill': { library: 'MaterialIcons', name: 'home' },
  'paperplane.fill': { library: 'MaterialIcons', name: 'send' },
  'chevron.left.forwardslash.chevron.right': { library: 'MaterialIcons', name: 'code' },
  'chevron.right': { library: 'MaterialIcons', name: 'chevron-right' },
  
  // FontAwesome icons
  'heart.fill': { library: 'FontAwesome', name: 'heart' },
  'star.fill': { library: 'FontAwesome', name: 'star' },
  'user.fill': { library: 'FontAwesome', name: 'user' },
  'gear': { library: 'FontAwesome', name: 'gear' },
  'money': { library: 'FontAwesome', name: 'money' },
  
  // Ionicons
  'person.circle.fill': { library: 'Ionicons', name: 'person-circle' },
  'settings.fill': { library: 'Ionicons', name: 'settings' },
  'camera.fill': { library: 'Ionicons', name: 'camera' },
  'notifications.fill': { library: 'Ionicons', name: 'notifications' },
  'receipt.outline': { library: 'Ionicons', name: 'receipt-outline' },

  // AntDesign icons
  'plus.circle.fill': { library: 'AntDesign', name: 'pluscircle' },
  'search': { library: 'AntDesign', name: 'search1' },
  'shopping.cart.fill': { library: 'AntDesign', name: 'shoppingcart' },
  
  // Feather icons
  'menu': { library: 'Feather', name: 'menu' },
  'edit': { library: 'Feather', name: 'edit-2' },
  'trash': { library: 'Feather', name: 'trash-2' },
  'download': { library: 'Feather', name: 'download' },
} as const;

/**
 * An icon component that uses native SF Symbols on iOS, and various icon libraries on Android and web.
 * This ensures a consistent look across platforms with access to multiple icon sets.
 * Icon `name`s are based on SF Symbols and require manual mapping to the desired icon library.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const iconConfig = MAPPING[name];
  
  if (!iconConfig) {
    console.warn(`Icon "${name}" not found in mapping. Falling back to MaterialIcons home.`);
    return <MaterialIcons color={color} size={size} name="home" style={style} />;
  }
  
  const iconProps = {
    color,
    size,
    style,
    name: iconConfig.name as any, // Type assertion needed due to union types
  };
  
  switch (iconConfig.library) {
    case 'FontAwesome':
      return <FontAwesome {...iconProps} />;
    case 'Ionicons':
      return <Ionicons {...iconProps} />;
    case 'AntDesign':
      return <AntDesign {...iconProps} />;
    case 'Feather':
      return <Feather {...iconProps} />;
    case 'MaterialIcons':
    default:
      return <MaterialIcons {...iconProps} />;
  }
}