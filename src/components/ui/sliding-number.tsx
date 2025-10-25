'use client';
import { useEffect, useId } from 'react';
import {
  MotionValue,
  motion,
  useSpring,
  useTransform,
  motionValue,
} from 'motion/react';
import useMeasure from 'react-use-measure';

const TRANSITION = {
  type: 'spring',
  stiffness: 280,
  damping: 18,
  mass: 0.3,
};

function Digit({ value, place }: { value: number; place: number }) {
  const valueRoundedToPlace = Math.floor(value / place) % 10;
  const initial = motionValue(valueRoundedToPlace);
  const animatedValue = useSpring(initial, TRANSITION);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div className='relative inline-block w-[1ch] overflow-x-visible overflow-y-clip leading-none tabular-nums'>
      <div className='invisible'>0</div>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue<number>; number: number }) {
  const uniqueId = useId();
  const [ref, bounds] = useMeasure();

  const y = useTransform(mv, (latest) => {
    if (!bounds.height) return 0;
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * bounds.height;

    if (offset > 5) {
      memo -= 10 * bounds.height;
    }

    return memo;
  });

  // don't render the animated number until we know the height
  if (!bounds.height) {
    return (
      <span ref={ref} className='invisible absolute'>
        {number}
      </span>
    );
  }

  return (
    <motion.span
      style={{ y }}
      layoutId={`${uniqueId}-${number}`}
      className='absolute inset-0 flex items-center justify-center'
      transition={TRANSITION}
      ref={ref}
    >
      {number}
    </motion.span>
  );
}

type SlidingNumberProps = {
  value: number;
  padStart?: boolean;
  decimalSeparator?: string;
  useCommas?: boolean;
};

export function SlidingNumber({
  value,
  padStart = false,
  decimalSeparator = '.',
  useCommas = true,
}: SlidingNumberProps) {
  const absValue = Math.abs(value);
  const [integerPart, decimalPart] = absValue.toString().split('.');
  const integerValue = parseInt(integerPart, 10);
  
  // Add commas to integer part
  let formattedInteger = integerPart;
  if (useCommas && integerValue >= 1000) {
    formattedInteger = integerValue.toLocaleString('en-US');
  }
  
  const paddedInteger =
    padStart && integerValue < 10 ? `0${integerPart}` : integerPart;
  const integerDigits = paddedInteger.split('');
  const integerPlaces = integerDigits.map((_, i) =>
    Math.pow(10, integerDigits.length - i - 1)
  );

  // Create an array with digits and comma positions
  const renderParts: { type: 'digit' | 'comma'; value?: number; place?: number }[] = [];
  const reversedDigits = integerDigits.reverse();
  
  reversedDigits.forEach((_, index) => {
    const actualIndex = integerDigits.length - 1 - index;
    renderParts.push({
      type: 'digit',
      value: integerValue,
      place: integerPlaces[actualIndex],
    });
    
    // Add comma after every 3 digits (from the right), but not at the end
    if (useCommas && index < reversedDigits.length - 1 && (index + 1) % 3 === 0) {
      renderParts.push({ type: 'comma' });
    }
  });

  return (
    <div className='flex items-center'>
      {value < 0 && '-'}
      {renderParts.map((part, index) => 
        part.type === 'comma' ? (
          <span key={`comma-${index}`}>,</span>
        ) : (
          <Digit
            key={`digit-${part.place}`}
            value={part.value!}
            place={part.place!}
          />
        )
      )}
      {decimalPart && (
        <>
          <span>{decimalSeparator}</span>
          {decimalPart.split('').map((_, index) => (
            <Digit
              key={`decimal-${index}`}
              value={parseInt(decimalPart, 10)}
              place={Math.pow(10, decimalPart.length - index - 1)}
            />
          ))}
        </>
      )}
    </div>
  );
}
