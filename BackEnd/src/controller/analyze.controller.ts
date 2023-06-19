import * as tf from '@tensorflow/tfjs';
import { WaterLevelModel } from '../model/water.model';
import { Request, Response } from 'express';
import { WaterLevel } from '../global/types.global';

export const AnalyzeController = {
  PredictFlooding: async () => {
    const data = await WaterLevelModel.find();
    const input = data.map((item: WaterLevel) => [
      item.waterLevel,
      item.tempature,
      item.humidity,
    ]);
    const output = data.map((item: WaterLevel) => item.status);



    const xs = tf.tensor2d(input, [data.length, 3]);
    const ys = tf.tensor2d(output, [data.length, 1]);
    const model = tf.sequential();
    model.add(
      tf.layers.dense({ units: 64, inputShape: [3], activation: 'relu' })
    );
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

    model.compile({
      optimizer: 'adam',
      loss: 'binaryCrossentropy',
      metrics: ['accuracy'],
    });
    model.fit(xs, ys, { epochs: 100 });

    // Evaluate the model
    const lossAndMetrics: any = model.evaluate(xs, ys, { batchSize: 32 });
    console.log(
      'Loss: ' + lossAndMetrics[0] + ' Accuracy: ' + lossAndMetrics[1]
    );

    // Make predictions
    const newInputs = [
      [10, 20, 30],
      [30, 40, 50],
    ];
    const newInputsTensor = tf.tensor2d(newInputs, [newInputs.length, 3]);
    const predictions = model.predict(newInputsTensor) as tf.Tensor;

    console.log("Predict: " + predictions)

    console.log("Predict: " + predictions.dataSync());

    // const binary = Array.from(predictions)
  },
};
