import { Formatter, IDataToFormat } from '../Formatter.ts';
import { colorStringByLevel } from '../helpers/color.ts';
import { formatDate } from '../helpers/time.ts';
import { LevelShortName } from '../types.ts';

/**
 * ITextFormatterOptions
 * @interface ITextFormatterOptions
 * @property {boolean} colorize - default true
 * @property {boolean} showMetadata - default true
 * @property {string} timestampPattern - default 'yyyy-MM-dd HH:mm:ss'
 */
interface ITextFormatterOptions {
  showMetadata: boolean;
  colorize: boolean;
  timestampPattern: string;
}

const defaultOptions: ITextFormatterOptions = {
  showMetadata: true,
  colorize: true,
  timestampPattern: 'yyyy-MM-dd HH:mm:ss',
};

/**
 * TextFormatter
 * @class TextFormatter
 * @extends Formatter
 * @property {ITextFormatterOptions} options
 */
export class TextFormatter extends Formatter<ITextFormatterOptions> {
  constructor(options = defaultOptions) {
    super(options, defaultOptions);
  }

  format(data: IDataToFormat): string {
    const time = formatDate(
      new Date(),
      this.options.timestampPattern,
    );

    const logString = `${time} [${
      LevelShortName[data.level]
    }] ${data.name} <${data.uuid}>: ${data.msg}\n`;

    return this.options.colorize
      ? colorStringByLevel(data.level, logString)
      : logString;
  }
}
