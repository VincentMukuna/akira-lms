import {
    EditorBackgroundColor,
    EditorBubbleMenu,
    EditorCharacterCount,
    EditorClearFormatting,
    EditorFloatingMenu,
    EditorFormatBold,
    EditorFormatCode,
    EditorFormatItalic,
    EditorFormatStrike,
    EditorFormatSubscript,
    EditorFormatSuperscript,
    EditorFormatUnderline,
    EditorLinkSelector,
    EditorNodeBulletList,
    EditorNodeCode,
    EditorNodeHeading1,
    EditorNodeHeading2,
    EditorNodeHeading3,
    EditorNodeOrderedList,
    EditorNodeQuote,
    EditorNodeTable,
    EditorNodeTaskList,
    EditorNodeText,
    EditorProvider,
    EditorSelector,
    EditorTableColumnAfter,
    EditorTableColumnBefore,
    EditorTableColumnDelete,
    EditorTableColumnMenu,
    EditorTableDelete,
    EditorTableFix,
    EditorTableGlobalMenu,
    EditorTableHeaderColumnToggle,
    EditorTableHeaderRowToggle,
    EditorTableMenu,
    EditorTableMergeCells,
    EditorTableRowAfter,
    EditorTableRowBefore,
    EditorTableRowDelete,
    EditorTableRowMenu,
    EditorTableSplitCell,
    EditorTextColor,
} from '@/components/ui/kibo-ui/editor';
import { type Editor } from '@tiptap/core';

const textColors = [
    { name: 'Red', color: '#b91c1c' },
    { name: 'Orange', color: '#c2410c' },
    { name: 'Amber', color: '#b45309' },
    { name: 'Yellow', color: '#a16207' },
];

const backgroundColors = [
    { name: 'Red', color: '#fca5a5' },
    { name: 'Orange', color: '#fdba74' },
    { name: 'Amber', color: '#fcd34d' },
    { name: 'Yellow', color: '#fde047' },
];

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({
    content,
    onChange,
    placeholder = 'Start writing...',
}: RichTextEditorProps) {
    const handleUpdate = ({ editor }: { editor: Editor }) => {
        const json = editor.getJSON();
        onChange(JSON.stringify(json));
    };

    const initialContent = content
        ? JSON.parse(content)
        : {
              type: 'doc',
              content: [
                  {
                      type: 'paragraph',
                      content: [],
                  },
              ],
          };

    return (
        <div className="overflow-hidden rounded-lg border">
            <EditorProvider
                content={initialContent}
                placeholder={placeholder}
                className="min-h-[200px] overflow-y-auto p-4"
                onUpdate={handleUpdate}
            >
                <EditorFloatingMenu>
                    <EditorNodeHeading1 hideName />
                    <EditorNodeBulletList hideName />
                    <EditorNodeQuote hideName />
                    <EditorNodeCode hideName />
                    <EditorNodeTable hideName />
                </EditorFloatingMenu>
                <EditorBubbleMenu>
                    <EditorSelector title="Text">
                        <EditorNodeText />
                        <EditorNodeHeading1 />
                        <EditorNodeHeading2 />
                        <EditorNodeHeading3 />
                        <EditorNodeBulletList />
                        <EditorNodeOrderedList />
                        <EditorNodeTaskList />
                        <EditorNodeQuote />
                        <EditorNodeCode />
                    </EditorSelector>
                    <EditorSelector title="Format">
                        <EditorFormatBold />
                        <EditorFormatItalic />
                        <EditorFormatUnderline />
                        <EditorFormatStrike />
                        <EditorFormatCode />
                        <EditorFormatSuperscript />
                        <EditorFormatSubscript />
                    </EditorSelector>
                    <EditorSelector title="Color">
                        {textColors.map((color) => (
                            <EditorTextColor
                                key={color.name}
                                color={color.color}
                                name={color.name}
                            />
                        ))}
                        {backgroundColors.map((color) => (
                            <EditorBackgroundColor
                                key={color.name}
                                color={color.color}
                                name={color.name}
                            />
                        ))}
                    </EditorSelector>
                    <EditorLinkSelector />
                    <EditorClearFormatting />
                </EditorBubbleMenu>
                <EditorTableMenu>
                    <EditorTableColumnMenu>
                        <EditorTableColumnBefore />
                        <EditorTableColumnAfter />
                        <EditorTableColumnDelete />
                    </EditorTableColumnMenu>
                    <EditorTableRowMenu>
                        <EditorTableRowBefore />
                        <EditorTableRowAfter />
                        <EditorTableRowDelete />
                    </EditorTableRowMenu>
                    <EditorTableGlobalMenu>
                        <EditorTableHeaderColumnToggle />
                        <EditorTableHeaderRowToggle />
                        <EditorTableDelete />
                        <EditorTableMergeCells />
                        <EditorTableSplitCell />
                        <EditorTableFix />
                    </EditorTableGlobalMenu>
                </EditorTableMenu>
                <EditorCharacterCount.Words>Words: </EditorCharacterCount.Words>
            </EditorProvider>
        </div>
    );
}
