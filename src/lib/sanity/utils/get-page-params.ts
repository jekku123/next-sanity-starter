export default function getPageParams(type: string) {
  if (type === "frontpage") {
    return `{
    _id,
    _type,
    slug,
    title,
    content[] {
      ...,
      _type == "hero" => {
        ...,
        primaryLink {
          ...,
          "internal": internal->slug.current,
          external,
        },
        secondaryLink {
          ...,
          "internal": internal->slug.current,
          external,
        }
      },
    }
  }`;
  }

  if (type === "page") {
    return `{
      _id,
      _type,
      slug,
      title,
      content[]{
        ...,
        _type == "formattedText" => {
          ...,
            ...,
            body[] {
              ...,
              _type == "image" => {
                ...,
                asset-> {
                  ...,
                  url,
                  metadata {
                    dimensions {
                      ...,
                      aspectRatio,
                    },
                  },
                },
              },
            },
        },
      }
    }`;
  }
  return "";
}
