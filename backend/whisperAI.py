# Import whisper module
import whisper

def transcribe_audio(audioFile):

    # Loads in whisper audio to be transcribed
    model = whisper.load_model("base")
    result = model.transcribe(audioFile)
    print(result)
    
	# Returns the result
    return result

