# Import whisper module
import whisper
#import os

def transcribe_audio(audioFile):
    # Get the file path
    # mypath = os.path.abspath(__file__)
    # mydir = os.path.dirname(mypath)
    # audioFile = os.path.join(mydir, "Recording.mp3")

    # Loads in whisper audio to be transcribed
    model = whisper.load_model("tiny.en")
    result = whisper.transcribe(model=model, audio=audioFile)

	# Returns the result
    return result

