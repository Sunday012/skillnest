import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

interface LeaveReviewCardProps {
  freelancerFirstName: string;
  onSubmitReview?: (rating: number, text: string) => void;
}

export function LeaveReviewCard({ freelancerFirstName, onSubmitReview }: LeaveReviewCardProps) {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (onSubmitReview) {
      onSubmitReview(rating, reviewText);
    }
  };

  if (isSubmitted) {
    return (
      <View style={styles.reviewBox}>
        <Text style={styles.submittedTitle}>✓ Review Submitted</Text>
        <Text style={styles.submittedSub}>
          Thank you for sharing your feedback on working with {freelancerFirstName}!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.reviewBox}>
      <Text style={styles.title}>Leave a Review</Text>
      <Text style={styles.subtitle}>Your rating helps keep SkillNest quality high.</Text>

      {/* Interactive Stars */}
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Pressable key={star} onPress={() => setRating(star)}>
            <Text style={[styles.starIcon, star <= rating && styles.starIconActive]}>
              ★
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Feedback input */}
      <View style={styles.field}>
        <TextInput
          style={styles.textarea}
          value={reviewText}
          onChangeText={setReviewText}
          multiline
          numberOfLines={3}
          placeholder={`How was working with ${freelancerFirstName}? Communication, quality, adherence to brief.`}
          placeholderTextColor="#93A0B4"
        />
      </View>

      <Pressable style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitBtnText}>Submit Review</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E9F1',
    borderRadius: 14,
    padding: 22,
    marginTop: 28,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Manrope_700Bold',
    color: '#10172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
    marginBottom: 16,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 14,
  },
  starIcon: {
    fontSize: 24,
    color: '#E7E9F1',
  },
  starIconActive: {
    color: '#F5A623',
  },
  field: {
    marginBottom: 14,
  },
  textarea: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#E7E9F1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#10172A',
    backgroundColor: '#FFFFFF',
    minHeight: 90,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: '#EC1257',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
  },
  submittedTitle: {
    fontSize: 16,
    fontFamily: 'Manrope_700Bold',
    color: '#166534',
    marginBottom: 4,
  },
  submittedSub: {
    fontSize: 13.5,
    color: '#5B6472',
    fontFamily: 'Inter_400Regular',
  },
});
