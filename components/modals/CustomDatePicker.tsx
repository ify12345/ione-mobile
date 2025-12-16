import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';


interface CustomDatePickerProps {
  date: Date;
  onChange: (date: Date) => void;
  isVisible: boolean;
  onClose: () => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  date,
  onChange,
  isVisible,
  onClose,
  minimumDate,
  maximumDate,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date(date));
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [viewMode, setViewMode] = useState<'calendar' | 'month' | 'year'>('calendar');
  const [yearRange, setYearRange] = useState({
    start: Math.floor(date.getFullYear() / 10) * 10,
    end: Math.floor(date.getFullYear() / 10) * 10 + 9,
  });

  useEffect(() => {
    if (isVisible) {
      const newDate = new Date(date);
      setSelectedDate(newDate);
      setCurrentMonth(newDate.getMonth());
      setCurrentYear(newDate.getFullYear());
      setViewMode('calendar');
      updateYearRange(newDate.getFullYear());
    }
  }, [isVisible, date]);

  const updateYearRange = (year: number) => {
    const decadeStart = Math.floor(year / 10) * 10;
    setYearRange({
      start: decadeStart,
      end: decadeStart + 9,
    });
  };

  const getDaysInMonth = (year: number, month: number): number =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year: number, month: number): number =>
    new Date(year, month, 1).getDay();

  const generateDays = (): (number | null)[] => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return days;
  };

  const changeMonth = (increment: number) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
      updateYearRange(newYear);
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
      updateYearRange(newYear);
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const changeYearRange = (increment: number) => {
    const newStart = yearRange.start + increment * 10;
    setYearRange({
      start: newStart,
      end: newStart + 9,
    });
  };

  const isDateDisabled = (day: number): boolean => {
    const testDate = new Date(currentYear, currentMonth, day);

    if (minimumDate && testDate < minimumDate) return true;
    if (maximumDate && testDate > maximumDate) return true;

    return false;
  };

  const handleDayPress = (day: number | null) => {
    if (day && !isDateDisabled(day)) {
      const newDate = new Date(currentYear, currentMonth, day);
      setSelectedDate(newDate);
    }
  };

  const handleMonthSelect = (month: number) => {
    setCurrentMonth(month);
    setViewMode('calendar');
  };

  const handleYearSelect = (year: number) => {
    setCurrentYear(year);
    updateYearRange(year);
    setViewMode('month');
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = generateDays();

  const generateYears = (): number[] => {
    const years = [];
    for (let i = yearRange.start; i <= yearRange.end; i++) {
      years.push(i);
    }
    return years;
  };

  const isYearDisabled = (year: number): boolean => {
    if (maximumDate && year > maximumDate.getFullYear()) return true;
    if (minimumDate && year < minimumDate.getFullYear()) return true;
    return false;
  };

  const renderCalendarView = () => (
    <>
      <View style={styles.datePickerHeader}>
        <TouchableOpacity
          onPress={() => setViewMode('month')}
          style={styles.monthYearSelector}
        >
          <Text style={styles.monthYearText}>{monthNames[currentMonth]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            updateYearRange(currentYear);
            setViewMode('year');
          }}
          style={styles.monthYearSelector}
        >
          <Text style={styles.monthYearText}>{currentYear}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekdayRow}>
        {weekdayNames.map((day) => (
          <Text key={day} style={styles.weekdayText}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {days.map((day, index) => {
          const isDisabled = day ? isDateDisabled(day) : true;
          const isSelected =
            day === selectedDate.getDate() &&
            currentMonth === selectedDate.getMonth() &&
            currentYear === selectedDate.getFullYear();
          const isToday =
            day === new Date().getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear();

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCell,
                !day && styles.emptyCell,
                isSelected && styles.selectedDayCell,
                isToday && styles.todayCell,
                isDisabled && styles.disabledCell,
              ]}
              onPress={() => handleDayPress(day)}
              disabled={!day || isDisabled}
            >
              <Text
                style={[
                  styles.dayText,
                  isSelected && styles.selectedDayText,
                  isToday && styles.todayText,
                  isDisabled && styles.disabledText,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );

  const renderMonthView = () => (
    <>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          onPress={() => setViewMode('calendar')}
          style={styles.navButton}
        >
          <Ionicons name="chevron-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.viewTitle}>Select Month</Text>
        <View style={{ width: 20 }} />
      </View>

      <View style={styles.monthGrid}>
        {monthNames.map((month, index) => (
          <TouchableOpacity
            key={month}
            style={[
              styles.monthCell,
              index === currentMonth && styles.selectedMonthCell,
            ]}
            onPress={() => handleMonthSelect(index)}
          >
            <Text
              style={[
                styles.monthText,
                index === currentMonth && styles.selectedMonthText,
              ]}
            >
              {month.substring(0, 3)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderYearView = () => (
    <>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          onPress={() => changeYearRange(-1)}
          style={styles.navButton}
          disabled={yearRange.start <= 1900}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={yearRange.start <= 1900 ? '#aaa' : '#fff'}
          />
        </TouchableOpacity>
        <Text style={styles.viewTitle}>
          {yearRange.start} - {yearRange.end}
        </Text>
        <TouchableOpacity
          onPress={() => changeYearRange(1)}
          style={styles.navButton}
          disabled={maximumDate ? yearRange.end >= maximumDate.getFullYear() : false}
        >
          <Ionicons
            name="chevron-forward"
            size={20}
            color={
              maximumDate && yearRange.end >= maximumDate.getFullYear()
                ? '#aaa'
                : '#fff'
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.yearGrid}>
        {generateYears().map((year) => {
          const disabled = isYearDisabled(year);
          return (
            <TouchableOpacity
              key={year}
              style={[
                styles.yearCell,
                year === currentYear && styles.selectedYearCell,
                disabled && styles.futureYearCell,
              ]}
              onPress={() => !disabled && handleYearSelect(year)}
              disabled={disabled}
            >
              <Text
                style={[
                  styles.yearText,
                  year === currentYear && styles.selectedYearText,
                  disabled && styles.futureYearText,
                ]}
              >
                {year}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={[Colors.light.tint, '#3b5998']}
            style={styles.calendarContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {viewMode === 'calendar' && renderCalendarView()}
            {viewMode === 'month' && renderMonthView()}
            {viewMode === 'year' && renderYearView()}

            <Text style={styles.selectedDateText}>
              Selected: {monthNames[selectedDate.getMonth()]}{' '}
              {selectedDate.getDate()}, {selectedDate.getFullYear()}
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  // Fix timezone offset so selected date matches what user sees
                  const correctedDate = new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate()
                  );
                  onChange(correctedDate);
                  onClose();
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.confirmButtonText}>Select</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  calendarContainer: {
    padding: 20,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  monthYearSelector: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  monthYearText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekdayText: {
    width: '14.28%',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 2,
  },
  emptyCell: {
    backgroundColor: 'transparent',
  },
  selectedDayCell: {
    backgroundColor: '#fff',
  },
  todayCell: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  disabledCell: {
    opacity: 0.3,
  },
  dayText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedDayText: {
    color: Colors.light.tint,
    fontWeight: '700',
  },
  todayText: {
    fontWeight: '700',
  },
  disabledText: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  navButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  monthCell: {
    width: '30%',
    paddingVertical: 16,
    marginVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedMonthCell: {
    backgroundColor: '#fff',
  },
  monthText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedMonthText: {
    color: Colors.light.tint,
    fontWeight: '700',
  },
  yearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  yearCell: {
    width: '30%',
    paddingVertical: 16,
    marginVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedYearCell: {
    backgroundColor: '#fff',
  },
  futureYearCell: {
    opacity: 0.4,
  },
  yearText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedYearText: {
    color: Colors.light.tint,
    fontWeight: '700',
  },
  futureYearText: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  selectedDateText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  confirmButtonText: {
    color: Colors.light.tint,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CustomDatePicker;