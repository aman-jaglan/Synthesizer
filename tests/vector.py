
#%%
import math
import numpy as np
import pandas as pd
import torch

# %%

# Implementations of the softmax function

def softmax(scores: list[float]) -> list[float]:
    a = np.array(scores)
    soft = np.exp(a) / np.sum(np.exp(a))
    probabilities = [round(val, 4) for val in soft]
    return probabilities



# %%

# Implementations of the single neuron model

def single_neuron_model(features: list[list[float]], labels: list[int], weights: list[float], bias: float) -> (list[float], float):

    def MSE(predict, actual) -> float:
        return np.square(predict - actual)
    
    probabilities = []
    mse = 0
    for val , label in zip(features, labels):
        f = np.dot(weights,val) + bias
        prob = 1/ (1+np.exp(-f))
        probabilities.append(prob)
        mse += MSE(prob, label)
        
    return probabilities, mse/len(labels)

single_neuron_model([[1,2,3],[2,3,4]],[0,1],[0.1,0.2,0.3],0.5)

# %%

# Implementations of Single Neuron with Backpropagation

def train_neuron(features: np.ndarray, labels: np.ndarray, initial_weights: np.ndarray, initial_bias: float, learning_rate: float, epochs: int) -> (np.ndarray, float, list[float]):
	# Your code here
    updated_weights = initial_weights
    updated_bias = initial_bias
    mse_values = []
    for i in range(0, epochs):
        epoch_error = 0
        for val, label in zip(features, labels):
           f = np.dot(updated_weights, val) + updated_bias
           predict = 1/(1 + np.exp(-f))
           error = predict - label
           epoch_error += error ** 2
           updated_weights -= error * learning_rate * val
           updated_bias -= learning_rate * error

        mse_values.append(epoch_error/len(labels))

    return np.round(updated_weights,4), round(updated_bias, 4), np.round(mse_values,4)

print(train_neuron(np.array([[1.0, 2.0], [2.0, 1.0], [-1.0, -2.0]]), np.array([1, 0, 0]), np.array([0.1, -0.2]), 0.0, 0.1, 2))

# %%

# KL Divergence Implementation ->  used to measure the difference between two probability distributions

def kl_divergence_normal(mu_p, sigma_p, mu_q, sigma_q):
    term1 = np.log(sigma_q / sigma_p)
    term2 = (np.square(sigma_p) + np.square(mu_p - mu_q)) / (2 * np.square(sigma_q))
    return term1 + term2 - 0.5

kl_divergence_normal(0.0, 1.0, 0.0, 1.0)

# %%

# Implementaiton of Linear Regression using normal equation

def linear_regression_normal_equation(X: list[list[float]], y: list[float]) -> list[float]:
	X = np.array(X)
	y = np.array(y)

	dot_product = np.dot(X.T, X)
	inverse = np.linalg.inv(dot_product)
	theta = np.dot(np.dot(inverse, X.T), y)
	return [round(val, 4) for val in theta]

linear_regression_normal_equation([[1, 2], [2, 3], [3, 4]], [3, 5, 7])
# %%
# Implementaiton of Linear Regression using gradient descent

def linear_regression_gradient_descent(X: np.ndarray, y: np.ndarray, alpha: float, iterations: int) -> np.ndarray:
    m, n = X.shape
    theta = np.zeros((n, 1))
    error = 0
    for i in range(0, iterations):
        prediction = X.dot(theta)
        error = prediction - y
        gradient = (1/m) * X.T.dot(error)
        theta = theta - alpha * gradient
        print(theta)

    print(theta)    
    return np.round(theta, 4)

linear_regression_gradient_descent(np.array([[1, 1], [1, 2], [1, 3]]), np.array([1, 2, 3]), 0.01, 2)

# %%

# implementation of the basic autograd operations

class Value:
    def __init__(self, data, _children=(), _op=''):
        self.data = data
        self.grad = 0
        self._backward = lambda: None
        self._prev = set(_children)
        self._op = _op

    def __repr__(self):
        return f"Value(data={self.data}, grad={self.grad})"

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, _children=(self, other), _op='+')

        def _backward(): 
            self.grad += out.grad
            other.grad += out.grad

        out._backward = _backward
        return out

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, _children=(self, other), _op='*')

        def _backward():
            self.grad += out.grad * other.data
            other.grad += out.grad * self.data

        out._backward = _backward
        return out

    def relu(self):
        out = Value(max(0, self.data), _children=(self,), _op='ReLU')

        def _backward():
            self.grad += (1 if self.data > 0 else 0) * out.grad

        out._backward = _backward
        return out 

    def backward(self):
        topo = []
        visited = set()

        def build_topo(v):
            if v not in visited:
                visited.add(v)
                for child in v._prev:
                    build_topo(child)
                topo.append(v)

        build_topo(self)
        self.grad = 1

        for node in reversed(topo):
            node._backward()
# %%
# Implementation of the poisson distribution

def poisson_probability(k, lam):
    val = (lam ** k) * math.exp(-lam) / math.factorial(k) 
    return round(val, 4)


# %%
