import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

type CustomButtonProps = {
  title: string;
  handlePress: (event: GestureResponderEvent) => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles = "",
  textStyles = "",
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      style={{
        padding: 20,
        shadowColor: "020202",
        shadowOffset: { width: 2, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 2,
      }}
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-[#fff]/60 backdrop-blur-lg rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
