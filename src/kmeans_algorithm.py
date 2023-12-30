import matplotlib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sb
from sklearn.cluster import KMeans
import os
matplotlib.use('Agg')


def load_data(file_path):
    dataframe = pd.read_csv(file_path)
    dataframe.columns = dataframe.columns.str.strip()
    return dataframe


def preprocess_data(dataframe):
    dataframe = dataframe.drop(['id_usuario', 'index'], axis=1, errors='ignore')
    dataframe.columns = dataframe.columns.str.strip()
    return np.array(dataframe)


def apply_kmeans(data, n_clusters=4, random_state=0):
    kmeans = KMeans(n_clusters=n_clusters, random_state=random_state)
    kmeans.fit(data)
    return kmeans.labels_


def plot_and_save_pairplot(dataframe, labels, save_path):
    dataframe["kmeans"] = labels
    sb.pairplot(dataframe, hue='kmeans')
    plt.savefig(save_path)


def run(file_path: str) -> None:
    dataframe = load_data(file_path)
    X = preprocess_data(dataframe)
    kmeans_labels = apply_kmeans(X)
    plot_and_save_pairplot(dataframe, kmeans_labels, f"static/img/result.png")


if __name__ == "__main__":
    run("../dataset.csv", "../result")
