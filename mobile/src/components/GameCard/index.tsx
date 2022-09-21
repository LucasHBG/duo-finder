import { LinearGradient } from "expo-linear-gradient";
import {
  TouchableOpacity,
  ImageBackground,
  ImageSourcePropType,
  Text,
} from "react-native";
import { THEME } from "../../theme";

import { styles } from "./styles";

export interface GameCardProps {
  id: string;
  name: string;
  ads: string;
  cover: ImageSourcePropType;
}

// Using local Props to simplify all parameters needed to pass to the function
interface Props {
  gameCard: GameCardProps;
}

export function GameCard({ gameCard, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground style={styles.cover} source={gameCard.cover} {...rest}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}> {gameCard.name} </Text>
          <Text style={styles.ads}> {gameCard.ads} anúncios </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
