/**
 * Asset configuration — single source of truth for all images.
 *
 * To swap an image: update the import path below.
 * For videos, edit src/config/media.ts instead.
 */

// Brand logo (Header, Footer, Phone carousel)
import brandmark from "@/assets/brandmark-design.png";
export { brandmark };

// Learner app screenshots (Home phone carousel, Learners page)
import bookingImg from "@/assets/booking-feature.png";
import bookingModalImg from "@/assets/booking.png";
import exploreInstructors from "@/assets/explore_instructors.png";
import location1 from "@/assets/location_1.png";
import takeLessons from "@/assets/take_lessons.png";

export const learnerScreenshots = [
  exploreInstructors,
  location1,
  bookingImg,
  takeLessons,
];

export const learnerAltTexts = [
  "Instructor list",
  "Map view",
  "Booking flow",
  "Booking confirmed",
];

// Instructor app screenshots (Home phone carousel)
import screen2 from "@/assets/screen-2.png";
import screen3 from "@/assets/screen-3.png";
import screen4 from "@/assets/screen-4.png";
import screen from "@/assets/screen.png";

export const instructorScreenshots = [screen, screen2, screen3, screen4];
export const instructorAltTexts = [
  "Booking details",
  "Messages",
  "Availability",
  "Lesson status",
];

// Learners page — feature section images (keys match feature `id` in Learners.tsx)
import progressImg from "@/assets/diary.png";
import rules from "@/assets/instructor-availability.png";
import calendarInstructorImg from "@/assets/instructor-calendar.png";
import messagingImg from "@/assets/instructor-messaging.png";
import students from "@/assets/instructor-student.png";
import learnerMessagingImg from "@/assets/learner-messaging.png";
import map from "@/assets/location_1.png";
import reviewImg from "@/assets/review.png";

export const learnerFeatureImages = {
  discovery: exploreInstructors,
  booking: bookingModalImg,
  messaging: learnerMessagingImg,
  progress: progressImg,
};

// Instructors page — feature section images (null = placeholder until screenshot is available)
export const instructorFeatureImages = {
  calendar: calendarInstructorImg,
  messaging: messagingImg,
  rules: rules,
  students: students,
  marketplace: map,
  review: reviewImg,
};
