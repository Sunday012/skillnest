import { View, Text } from 'react-native';

export function RoadmapItem({ 
  quarter, 
  title, 
  description, 
  status, 
  align = 'left' 
}: { 
  quarter: string; 
  title: string; 
  description: string; 
  status: 'active' | 'past' | 'future';
  align?: 'left' | 'right';
}) {
  return (
    <View className="flex-row mb-16 w-full max-w-[800px] self-center">
      {/* Desktop Layout Left */}
      <View className={`flex-1 hidden md:flex items-end pr-8 ${align === 'right' ? 'opacity-0' : ''}`}>
        <Text className="font-inter font-bold text-[14px] text-pink mb-2">{quarter}</Text>
        <Text className="font-manrope text-[21px] font-bold text-ink mb-2 text-right">{title}</Text>
        <Text className="text-[15px] text-gray-body text-right">{description}</Text>
      </View>

      {/* Timeline Dot */}
      <View className="w-16 items-center justify-start hidden md:flex">
        <View className={`w-[22px] h-[22px] rounded-full border-[3px] mt-1 z-10 ${
          status === 'active' ? 'bg-pink border-pink shadow-[0_0_0_6px_#FDE8EF]' :
          status === 'past' ? 'bg-white border-pink' :
          'bg-white border-border'
        }`} />
      </View>

      {/* Desktop Layout Right */}
      <View className={`flex-1 hidden md:flex items-start pl-8 ${align === 'left' ? 'opacity-0' : ''}`}>
        <Text className="font-inter font-bold text-[14px] text-pink mb-2">{quarter}</Text>
        <Text className="font-manrope text-[21px] font-bold text-ink mb-2">{title}</Text>
        <Text className="text-[15px] text-gray-body">{description}</Text>
      </View>

      {/* Mobile Layout (Visible only on small screens) */}
      <View className="flex-1 flex-row md:hidden">
        <View className="w-12 items-center">
          <View className={`w-[22px] h-[22px] rounded-full border-[3px] mt-1 z-10 ${
            status === 'active' ? 'bg-pink border-pink' :
            status === 'past' ? 'bg-white border-pink' :
            'bg-white border-border'
          }`} />
        </View>
        <View className="flex-1 pb-8">
          <Text className="font-inter font-bold text-[14px] text-pink mb-1">{quarter}</Text>
          <Text className="font-manrope text-[19px] font-bold text-ink mb-2">{title}</Text>
          <Text className="text-[15px] text-gray-body">{description}</Text>
        </View>
      </View>
    </View>
  );
}
