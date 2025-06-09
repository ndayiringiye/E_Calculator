import React, { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(`${parseFloat(newValue.toFixed(7))}`);
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(`${parseFloat(newValue.toFixed(7))}`);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const Button = ({ onClick, className = '', children, variant = 'default' }) => {
    const baseClasses = "h-16 rounded-2xl font-semibold text-lg transition-all duration-200 transform active:scale-95 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl";
    
    const variants = {
      default: "bg-white/10 hover:bg-white/20 text-white hover:scale-105",
      operator: "bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white hover:scale-105 shadow-orange-300/30",
      clear: "bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white hover:scale-105 shadow-red-300/30",
      equals: "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white hover:scale-105 shadow-green-300/30"
    };

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="mb-6 p-6 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10">
            <div className="text-right">
              <div className="text-4xl font-light text-white font-mono tracking-wider overflow-hidden">
                {display}
              </div>
              {operation && (
                <div className="text-sm text-white/60 mt-1">
                  {previousValue} {operation}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Button onClick={clear} variant="clear" className="col-span-2">
              AC
            </Button>
            <Button onClick={() => performOperation('÷')} variant="operator">
              ÷
            </Button>
            <Button onClick={() => performOperation('×')} variant="operator">
              ×
            </Button>

            <Button onClick={() => inputNumber(7)}>7</Button>
            <Button onClick={() => inputNumber(8)}>8</Button>
            <Button onClick={() => inputNumber(9)}>9</Button>
            <Button onClick={() => performOperation('-')} variant="operator">
              −
            </Button>

            <Button onClick={() => inputNumber(4)}>4</Button>
            <Button onClick={() => inputNumber(5)}>5</Button>
            <Button onClick={() => inputNumber(6)}>6</Button>
            <Button onClick={() => performOperation('+')} variant="operator">
              +
            </Button>

            <Button onClick={() => inputNumber(1)}>1</Button>
            <Button onClick={() => inputNumber(2)}>2</Button>
            <Button onClick={() => inputNumber(3)}>3</Button>
            <Button onClick={handleEquals} variant="equals" className="row-span-2">
              =
            </Button>

            <Button onClick={() => inputNumber(0)} className="col-span-2">
              0
            </Button>
            <Button onClick={inputDecimal}>.</Button>
          </div>
        </div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
    </div>
  );
}