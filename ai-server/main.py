from fastapi import FastAPI, UploadFile, File
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras import layers, models
from PIL import Image
import numpy as np
import io

app = FastAPI()

base_model = MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights="imagenet"
)

base_model.trainable = False

model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(128, activation="relu"),
    layers.Dropout(0.3),
    layers.Dense(4, activation="softmax")
])

model.load_weights("model/model.weights.h5")

class_names = [
    "Black Measles",
    "Black Rot",
    "Healthy",
    "Isariopsis Leaf Spot"
]

def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((224, 224))
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    processed_image = preprocess_image(image_bytes)

    prediction = model.predict(processed_image)
    predicted_index = int(np.argmax(prediction[0]))
    confidence = float(np.max(prediction[0]))

    return {
        "penyakit": class_names[predicted_index],
        "confidence": confidence
    }