import { SQSEvent } from 'aws-lambda';
import { validarEvento } from './utils/eventValidator';
import { validateEventInput } from './utils/validation';
import { ProcessingError } from './utils/errors';
import { processRequest } from './core/requestProcessor';

export const handler = async (event: SQSEvent): Promise<void> => {
  try {
    const validatedEvent = validarEvento(event);
    
    if (!validatedEvent) {
      throw new ProcessingError('Invalid event data');
    }

    const input = validateEventInput(validatedEvent);
    await processRequest(input);
  } catch (error) {
    console.error('Error processing event:', error);
    throw error;
  }
};