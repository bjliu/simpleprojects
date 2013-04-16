###############
#Benjamin Liu #
#Calculator.py#
###############


from math import *
from Queue import *
import operator
import re


ARITHMETIC_OPERATORS = {'+':  operator.add, '-':  operator.sub, '*':  operator.mul, '/':  operator.div}


def precedence(s):
    if s is '(':
        return 2
    elif s in ['*', '/']:
        return 1
    elif s in ['+', '-']:
        return 0


def calc_eval(infix):
    #implement Shunting-yard Algorithm
    stack = []
    queue = Queue()
    postfix = []
    infix = re.split('([0-9.]+|[*(\+)])', infix)
    for i in infix:
        if i not in ['+', '-', '*', '/', '(', ')', '']:
            #i is operand
            queue.put(i)
        elif i in ['+', '-', '*', '/']:
            #i is operator
            while stack and stack[-1] in ['+', '-', '*', '/'] and precedence(i) <= precedence(stack[-1]):
                queue.put(stack.pop())
            stack.append(i)
        elif i is '(':
            stack.append(i)
        elif i is ')':
            while stack[-1] is not '(':
                queue.put(stack.pop())
            if stack and stack[-1] is '(':
                stack.pop()
    while stack:
        queue.put(stack.pop())
    #end of Shuntint-yard Algorithm
    #push everything from the queue into the "postfix" list.
    while not queue.empty():
        postfix.append(queue.get())
    #clean the stack
    stack = []
    for val in postfix:
        if val in ARITHMETIC_OPERATORS:
            func = ARITHMETIC_OPERATORS[val]
            op1 = stack.pop()
            op2 = stack.pop()
            #op2 comes before op1, because a stack is LIFO
            stack.append(func(op2, op1))
        else:
            stack.append(float(val))
    return stack.pop()

#Allow user to input string through command line, which will be my method of input"
infix = raw_input("Enter the infix notation : ")
print "Output: " + str(calc_eval(infix))