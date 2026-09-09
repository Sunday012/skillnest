import { View, Text } from 'react-native';
import { Button } from '../Button';

interface PricingProps {
  title: string;
  subtitle: string;
  price: string;
  period?: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

export function PricingCard({ title, subtitle, price, period, features, isPopular, buttonText }: PricingProps) {
  return (
    <View className={`bg-white rounded-[14px] p-7 flex-1 min-w-[280px] w-full mb-6 lg:mb-0 ${isPopular ? 'border-2 border-pink' : 'border border-border'}`}>
      {isPopular && (
        <View className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-pink px-4 py-1.5 rounded-full z-10">
          <Text className="text-white text-xs font-bold tracking-wider">MOST POPULAR</Text>
        </View>
      )}
      <Text className="font-manrope text-[19px] font-bold text-ink mb-1.5">{title}</Text>
      <Text className="text-sm text-gray-body mb-4">{subtitle}</Text>
      
      <View className="flex-row items-baseline mb-5">
        <Text className="font-manrope text-[34px] font-extrabold text-ink">{price}</Text>
        {period && <Text className="font-inter text-[15px] font-semibold text-gray-body ml-1">{period}</Text>}
      </View>
      
      <View className="flex-1 mb-6 gap-3">
        {features.map((feature, i) => (
          <View key={i} className="flex-row items-start gap-2 pr-4">
            <Text className="text-green font-extrabold">✓</Text>
            <Text className="text-[14.5px] text-ink flex-1 leading-tight">{feature}</Text>
          </View>
        ))}
      </View>
      
      <Button 
        title={buttonText} 
        variant={isPopular ? 'primary' : 'outline'} 
        onPress={() => {}} 
      />
    </View>
  );
}
